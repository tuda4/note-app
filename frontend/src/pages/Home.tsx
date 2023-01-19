import UserOptions from "../components/UserOptions";
import { Container, Heading, Text, Grid, GridItem } from "@chakra-ui/react";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";


const Home = () => {
  // use hook useLoaderData to get the data from the server
  const {data} : any  = useLoaderData()
  return (
    <Container
      maxW="full"
      h="100vh"
      fontFamily="Source Code Pro"
      textColor="black"
      pt={10}
      px={10}
    >
      <Text as="h5" fontSize="3xl" textAlign="center" fontWeight="semibold">
        Note App
      </Text>
      <UserOptions />
      <Grid
        h="50vh"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={2}
      >
        <GridItem colSpan={1} bgColor="cyan.200" h="100%">
          <FolderList
            folders={data.folders}
          />
        </GridItem>
        <GridItem colSpan={3} bgColor="gray.200" h="100%" >
          <Outlet/>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Home;
