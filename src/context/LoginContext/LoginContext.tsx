import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, createUser, db, provider } from "../../api/firebase/firebse";
import { doc, getDoc } from "firebase/firestore";

interface Props {
  children: React.ReactNode;
}
interface UserData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface LoginContextType {
  userData: UserData | null;
  handleSignOut: () => void;
  handleSignIn: (email: string, password: string) => void;
  handleSignInWithGoogle: () => void;
  handleCreateUser: (values: UserData) => void;
}

export const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);

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
    setUserData(userData.data() as UserData);
  };

  const handleCreateUser = async (values: UserData) => {
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
          name: values.name,
          surname: values.surname,
          email: user.email,
        };
        await createUser(newUserData);
        console.log("User registered successfully");
      }
    } catch (error) {
      console.error("Error registering user:", error);
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
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUserData(userData);
          console.log(user);
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
