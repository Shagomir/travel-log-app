import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import App from "./App.jsx";
import Home from "./pages/Home";
import ListDetail from "./pages/ListDetail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./pages/List";
import Confirm from "./pages/Confirm";
import Edit from "./pages/Edit";

const colors = {
  brand: {
    900: "",
    800: "",
    700: "",
  },
};

const theme = extendTheme({ colors });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      {
        path: "/error",
        element: <NoMatch />,
      },
      {
        path: "/location",
        element: <List />,
      },
      {
        path: "/location/:id",
        element: <ListDetail />,
      },
      {
        path: "/delete/:id",
        element: <Confirm />,
      },
      { path: "/edit/:id", element: <Edit /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
