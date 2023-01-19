import Home from "../pages/Home";
import Login from "../pages/Login";
import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPages from "../pages/ErrorPages";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import { NoteListLoader, HomeLoader, NoteLoader, addNewNote, updateNote } from "../utils/LoaderRouter";

const AuthLayout = () => {
  return <AuthProvider children={<Outlet />} />;
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPages />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            // load data from server
            loader: HomeLoader,
            children: [
              {
                element: <NoteList />,
                path: "folder/:folderId",
                action: addNewNote,
                loader: NoteListLoader,
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                    action: updateNote,
                    loader: NoteLoader,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
