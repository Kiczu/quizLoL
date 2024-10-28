import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../../api/firebase/firebse";
import { AuthData, User } from "../../api/types";
import { userService } from "../../services/user";

interface Props {
  children: React.ReactNode;
}

type UserAuthData = Omit<User, "id"> & AuthData;

interface LoginContextType {
  userData: User | null;
  handleCreateUser: (values: UserAuthData) => void;
  handleSendResetPasswordEmail: (email: string) => void;
  handleSignOut: () => void;
  handleSignInWithGoogle: () => void;
  handleSignIn: (email: string, password: string) => void;
}

export const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const getUserData = async (id: string) => {
      const userData = await userService.get(id);
      setUserData(userData);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCreateUser = async (values: UserAuthData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      if (user) {
        const newUserData = {
          id: user.uid,
          login: values.login,
          firstName: values.firstName,
          email: values.email,
        };
        await userService.add(newUserData);
        console.log("User registered successfully");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleSendResetPasswordEmail = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };
  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        console.log("wylogowano");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignInWithGoogle = async () => {
    try {
      const authResult = await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUserData(userData);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        userData,
        handleSignOut,
        handleSignInWithGoogle,
        handleSignIn,
        handleCreateUser,
        handleSendResetPasswordEmail,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(LoginContext);

  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }

  return context;
};
