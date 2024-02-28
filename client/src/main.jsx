import ReactDOM from "react-dom/client";
// import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// import { createBreakpoints } from "@chakra-ui/theme-tools";

import App from "./App.jsx";
import Home from "./pages/Home";
import ListDetail from "./pages/ListDetail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./pages/List";
import Confirm from "./pages/Confirm";

const LogoImage = "./assets/traveler-logo.png";
// import Edit from "./pages/Edit";

// const breakpoints = createBreakpoints({
//   sm: '48em',
//   md: '52em',
//   lg: '64em',
//   xl: '80em',
// });

// extending theme
const colors = {
  brand: {
    900: "",
    800: "",
    700: "",
  },
};

const fonts = {
  heading: `'Prompt', sans-serif`,
};

const theme = extendTheme({ colors, fonts });

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
      // {
      //   path: "/assets/traveler-logo.png",
      //   element: LogoImage,
      // },
      // // { path: "/edit/:id", element: <Edit /> },
      // { path: "*", element: <NoMatch /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
