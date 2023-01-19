import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useRouteError } from "react-router-dom";



const ErrorPages = () => {
  let error : any = useRouteError();
  return (
    <Container
      as="main"
      maxW="full"
      h="100vh"
      bgColor="red.500"
      fontFamily="Source Code Pro"
      textColor="white"
      textAlign="center"
    >
      <Box py='10vh'>
        <Heading as="h2" textTransform="uppercase">
          Opps!
        </Heading>
        <Text>{error.statusText}</Text>
      </Box>
    </Container>
  );
};

export default ErrorPages;
