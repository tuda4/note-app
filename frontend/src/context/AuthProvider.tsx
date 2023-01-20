import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@chakra-ui/react";

// defind childern data
type Props = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user: any) => {
      // save info user
      if (user?.uid) {
        setUser(user);
        const accToken: string = user.accessToken;
        if (accToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", accToken);
          window.location.reload();
        }
        setIsLoading(false);
        return;
      }

      //  reset info user
      setIsLoading(false);
      setUser({});
      localStorage.clear();
      navigation("/login");
    });

    return () => unsubcribed();
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? (
        <Box maxW='100%' h='100vh' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
