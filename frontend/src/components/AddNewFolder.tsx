import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Tooltip,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { addNewFolder } from "../utils/LoaderRouter";
import { useNavigate, useSearchParams } from "react-router-dom";

const AddNewFolder = () => {
  const [newFolderName, setNewFolderName] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const navigation = useNavigate();
  // handle open Popup
  const [searchPopup, setSearchPopup] = useSearchParams();
  const popupName = searchPopup.get("popup");

  const folderInputChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewFolderName(e.target.value);
  };

  const handleOpen = () => {
    setSearchPopup({ popup: "add-folder" });
  };
  const handleClose = () => {
    setNewFolderName("");
    navigation(-1);
  };
  const handleAddFolder = async () => {
    const { addFolder }: any = await addNewFolder({ name: newFolderName });
    console.log({ addFolder });
    handleClose();
  };
  // render folder list
  useEffect(() => {
    if (popupName === "add-folder") {
      onOpen();
      return;
    }
    onClose();
  }, [popupName]);

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={handleOpen}
      initialFocusRef={firstFieldRef}
      closeOnBlur={false}
      placement="bottom"
    >
      <PopoverTrigger>
        <Box>
          <Tooltip label="New Folder">
            <Box cursor="pointer">
              <AiOutlineFolderAdd size={32} />
            </Box>
          </Tooltip>
        </Box>
      </PopoverTrigger>
      <PopoverContent w="360px">
        <PopoverCloseButton />
        <Stack px={2} py={10} maxW="lg" display="flex">
          <FormControl w="100%">
            <FormLabel htmlFor="foldername">Folder Name</FormLabel>
            <Input
              size="xl"
              rounded="md"
              p={2}
              id="foldername"
              onChange={folderInputChanged}
              autoFocus={true}
              value={newFolderName}
            />
          </FormControl>
          <ButtonGroup display="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleAddFolder}>
              Add
            </Button>
          </ButtonGroup>
        </Stack>
      </PopoverContent>
    </Popover>
  );
};

export default AddNewFolder;
