import { Box, Container, Heading, Button, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import React, { useContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request";

const Login = (): JSX.Element => {
  const auth = getAuth();
  const { user } : any= useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    const data  = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log('register', {data})
  };
  //   if login success navigate user from Home page

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  return (
    <Container
      maxW="full"
      bgColor="cyan.100"
      h="100vh"
      fontFamily={"Source Code Pro"}
      textColor="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={6}
    >
      <Text fontSize="xl" fontWeight="medium">
        Welcome back!
      </Text>
      <Button
        outline="solid"
        bgColor="transparent"
        _hover={{ bgColor: "gray.100" }}
        fontSize="xl"
        gap={2}
        onClick={handleLoginWithGoogle}
      >
        <FcGoogle size={28} />
        Login with Google
      </Button>
    </Container>
  );
};

export default Login;
