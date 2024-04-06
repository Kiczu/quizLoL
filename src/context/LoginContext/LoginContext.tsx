import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../api/firebase/firebse";

interface Props {
  children: React.ReactNode;
}
interface UserData {
  displayName: string;
}

interface LoginContextTyp {
    user: UserData | null;
  handleSignOut: () => void;
  handleSignIn: () => void;
}

export const LoginContext = createContext<LoginContextTyp | null>(null);

export const LoginProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ displayName: user.displayName || "" });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const authResult = await signInWithPopup(auth, provider);
      console.log(authResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider value={{ user, handleSignOut, handleSignIn }}>
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
