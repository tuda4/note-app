import { AuthContext } from "../context/AuthProvider";
import {
  Avatar,
  Box,
  Text,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import PushNotification from "./PushNotification";

const UserOptions = () => {
  const {
    user: { displayName, photoURL, auth },
  }: any = useContext(AuthContext);

  const handleLogout = () => {
    auth.signOut()
  }
  return (
    <Box display="flex" justifyContent="end" py={6} gap={2} alignItems='end'>
      <Menu>
        <MenuButton>
          <Box display='flex' alignItems="center" gap={3}>
            <Text fontSize="xl">{displayName}</Text>
            <Avatar src={photoURL}>
              <AvatarBadge boxSize="1em" bg="green.400" />
            </Avatar>
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
      <PushNotification/>
    </Box>
  );
};

export default UserOptions;
