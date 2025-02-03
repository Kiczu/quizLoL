import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../../api/firebase/firebse";
import { userService } from "../../services/userService";
import { UserDataResponseRegister } from "../../api/types";

interface Props {
  children: React.ReactNode;
}

interface LoginContextType {
  userData: UserDataResponseRegister | null;
  handleCreateUser: (values: UserDataResponseRegister) => void;
  handleSendResetPasswordEmail: (email: string) => void;
  handleSignOut: () => void;
  handleSignInWithGoogle: () => void;
  handleSignIn: (email: string, password: string) => void;
  refreshUserData: () => void;
}

export const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<UserDataResponseRegister | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async (id: string) => {
    const userData = await getDoc(doc(db, "users", id));
    const userDataFromFirestore = userData.data() as UserDataResponseRegister;

    if (userDataFromFirestore) {
      setUserData({
        ...userDataFromFirestore,
        uid: userData.id,
        avatar: userDataFromFirestore.avatar,
      });
    } else {
      console.log("User data not found in Firestore", id);
    }
  };

  const handleCreateUser = async (values: UserDataResponseRegister) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      if (user) {
        const newUserData = {
          id: user.uid,
          firstName: values.firstName,
          lastName: values.lastName,
          email: user.email,
        };
        await userService.createUser(newUserData);
        console.log("User registered successfully");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleSendResetPasswordEmail = async (email: string) => {
    try {
      const auth = getAuth();
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
      console.log(authResult);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await getUserData(user.uid);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const refreshUserData = async () => {
    if (userData?.uid) {
      await getUserData(userData.uid);
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
        refreshUserData,
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
