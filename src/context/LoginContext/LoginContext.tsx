import React, { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, provider } from "../../api/firebase/firebse";
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

interface LoginContextTyp {
  userData: UserData | null;
  handleSignOut: () => void;
  handleSignIn: (email: string, password: string) => void;
  handleSignInWithGoogle: () => void;
}

export const LoginContext = createContext<LoginContextTyp | null>(null);

export const LoginProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserData = async (id: string) => {
    const userData = await getDoc(doc(db, "users", id));
    setUserData(userData.data() as UserData);
  };

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

  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        console.log('wylogowano');
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
    // Dodaj argumenty email i password
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
      value={{ userData, handleSignOut, handleSignInWithGoogle, handleSignIn }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = React.useContext(LoginContext);

  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }

  return context;
};
