import {
  Avatar,
  AvatarBadge,
  Box,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { createClient } from "graphql-ws";
import { GRAPHQL_SUBSCRIPTION_GRAPHQL } from "../utils/constants";

const client = createClient({
  url: GRAPHQL_SUBSCRIPTION_GRAPHQL,
});

const query = `subscription PushNotification {
    notification {
      message
    }
  }`;

const PushNotification = () => {
  const [isNotify, setIsNotify] = useState("");
  const [notification, setNotification] = useState([])
  const { isOpen, onClose, onOpen } = useDisclosure();

    const handleClose = () => {
        onClose()
        setNotification([])
    }

  const firstFieldRef = React.useRef(null);
  useEffect(() => {
    (async () => {
      const onNext = (data: any) => {
        const message = data?.data?.notification?.message;
        setNotification(message);
        setIsNotify("green.500");
        console.log({ data });
      };

      await new Promise((resolve: any, reject) => {
        client.subscribe(
          {
            query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);

  return (
    <Box>
      <Popover
        isOpen={isOpen}
        onClose={handleClose}
        onOpen={onOpen}
        initialFocusRef={firstFieldRef}
        closeOnBlur={false}
        placement="left"
      >
        <PopoverTrigger>
          <Box>
            <Avatar
              icon={<AiOutlineBell color="black" size={30} />}
              outline="none"
              bgColor="white"
              cursor='pointer'
            >
              <AvatarBadge bg={isNotify} boxSize="1.25em" />
            </Avatar>
          </Box>
        </PopoverTrigger>
        <PopoverContent w="350px">
          <PopoverCloseButton />
          <Stack px={2} py={10} maxW="lg" display="flex" flexDirection='column'>
                {notification ? (notification.map(notify => (<Text fontSize={12} m={2}>{notify}</Text>))) : <Box>You have not any notification</Box>}
          </Stack>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default PushNotification;
