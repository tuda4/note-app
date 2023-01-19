import React, { useState } from "react";
import { Container, Box, Text, Card, CardBody } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import AddNewFolder from "./AddNewFolder";

type Props = {
  folders: {
    id: string;
    name: string;
  }[];
};

const FolderList = ({ folders }: Props) => {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);

  return (
    <Container py={2}>
      <Box display="flex" justifyContent="space-around">
        <Text textAlign="center" fontSize="xl" fontWeight="medium">
          Folder List
        </Text>
        <AddNewFolder />
      </Box>
      <Box  overflowY='scroll' h='50vh'>
        {folders ? folders.map((folder) => {
          return (
            <Link
              key={folder.id}
              to={`folder/${folder.id}`}
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              py={1}
              onClick={() => setActiveFolderId(folder.id)}
            >
              <Card
                bgColor={folder.id === activeFolderId ? "whiteAlpha.900" : ""}
              >
                <CardBody>
                  <Text>{folder.name}</Text>
                </CardBody>
              </Card>
            </Link>
          );
        }) : ['']}
      </Box>
    </Container>
  );
};

export default FolderList;
