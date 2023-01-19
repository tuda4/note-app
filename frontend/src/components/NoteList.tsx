import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import {
  Outlet,
  Link,
  useParams,
  useLoaderData,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import moment from "moment";

function NoteList() {
  // let folder = { notes: [{ id: "1", content: "<p>Learn Golang!</p>" }] };
  const { noteId } = useParams();
  const { folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const data: any = useLoaderData();
  const navigation = useNavigate();
  const submit = useSubmit();
// Selected first note
  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }
    if (data.data.folder.notes[0]) {
      navigation(`note/${data.data.folder.notes[0].id}`);
    }
  }, [noteId, data.data.folder.notes]);
  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      {
        method: "post",
        action: `/folder/${folderId}`,
      }
    );
  };
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
      <GridItem colSpan={1} bgColor="deepskyblue" w="100%" py={2}>
        <Box display="flex" justifyContent="space-around">
          <Text textAlign="center" fontWeight="semibold" fontSize="xl">
            Notes
          </Text>
          <Box cursor="pointer" onClick={handleAddNewNote}>
            <Tooltip label="New Note">
              <Box>
                <AiOutlineFileAdd size={28} />
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <Box overflowY='scroll' h='50vh'>
          {data.data.folder.notes
            ? data.data.folder.notes.map(
                (note: { id: string; content: string, updatedAt : string}) => {
                  return (
                    <Link
                      key={note.id}
                      to={`note/${note.id}`}
                      onClick={() => setActiveNoteId(note.id)}
                    >
                      <Card
                        bgColor={note.id === activeNoteId ? "orange.300" : ""}
                        m={2}
                      >
                        <CardBody display='flex' flexDirection='column' gap={2} padding={2}>
                          <div
                            style={{ fontSize: 14, fontWeight: "bold" }}
                            dangerouslySetInnerHTML={{
                              __html: `${
                                note.content.substring(0, 30)
                              }...`,
                            }}
                          />
                          <Text fontSize={12} textAlign='end'>{moment(note.updatedAt).format('MMM Do YYYY, h:mm:ss a ')}</Text>
                        </CardBody>
                      </Card>
                    </Link>
                  );
                }
              )
            : ["You have not notes"]}
        </Box>
      </GridItem>
      <GridItem colSpan={2}>
        <Text textAlign="center" fontSize="xl" fontWeight="semibold">
          Notes Detail
        </Text>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default NoteList;
