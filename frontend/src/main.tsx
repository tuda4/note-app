import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import Font from "./lib/Font";
import "./firebase/config";``
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ChakraProvider>
      <Font />
      <RouterProvider router={router} />
    </ChakraProvider>
);
