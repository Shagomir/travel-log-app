import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Heading,
  Flex,
  Box,
  Button,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

function Nav() {
  const [display, changeDisplay] = useState("none");
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Flex zIndex={20}>
          <Flex position="fixed" top="1rem" right="1rem" align="center">
            <Flex display={["none", "none", "flex", "flex"]}>
              <Link to="/location">
                <Button variant="ghost" aria-label="locations" my={5} w="100%">
                  My Locations
                </Button>
              </Link>
              <Button
                onClick={() => {
                  Auth.logout();
                  window.location.href = "/";
                }}
                variant="ghost"
                aria-label="Home"
                my={5}
                w="100%"
              >
                Logout
              </Button>
            </Flex>
            <IconButton
              aria-label="Open Menu"
              size="lg"
              mr={2}
              icon={<HamburgerIcon />}
              onClick={() => changeDisplay("flex")}
              display={["flex", "flex", "none", "none"]}
            />
          </Flex>
          <Flex
            w="100vw"
            display={display}
            bgColor="gray.50"
            zIndex={20}
            h="100vh"
            pos="fixed"
            top="0"
            left="0"
            overflowY="auto"
            flexDirection="column"
          >
            <Flex justify="flex-end">
              <IconButton
                mt={2}
                mr={2}
                aria-label="Close Menu"
                size="lg"
                icon={<CloseIcon />}
                onClick={() => changeDisplay("none")}
              />
            </Flex>
            <Flex flexDirection="column" align="center">
              <Link to="/location">
                <Button variant="ghost" aria-label="Home" my={5} w="100%">
                  My Locations
                </Button>
              </Link>
              <Button
                onClick={() => {
                  Auth.logout();
                  window.location.href = "/";
                }}
                variant="ghost"
                aria-label="Home"
                my={5}
                w="100%"
              >
                Logout
              </Button>
            </Flex>
          </Flex>
        </Flex>
      );
    } else {
      return (
        <Flex>
          <Flex position="fixed" top="1rem" right="1rem" align="center">
            <Flex display={["none", "none", "flex", "flex"]}>
              <Link to="/signup">
                <Button variant="ghost" aria-label="Home" my={5} w="100%">
                  Signup
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" aria-label="Home" my={5} w="100%">
                  Login
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      );
    }
  }

  return (
    <Flex
      position="fixed"
      top="1rem"
      left="1rem"
      align="center"
      my={0}
      zIndex={0}
    >
      <Heading>
        <nav>{showNavigation()}</nav>
      </Heading>
    </Flex>
  );
}

export default Nav;
