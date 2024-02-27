import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  Heading,
  Flex,
  Box,
  Button,
  IconButton,
  Text,
} from '@chakra-ui/react';

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Flex mb={10}>
          <Flex position="fixed" top="1rem" right="1rem" align="center">
            <Flex
              display={["none", "none", "flex", "flex"]}>
              <Link to="/location">
                <Button variant="ghost" aria-label="Home" my={5} w="100%">
                  My Locations
                </Button>
              </Link>
              {/* Original Comment: this is not using the Link component to logout of user and then refresh the application to the start 
              New Comment: Ask group/tutor if this logout will still function as expected as a Link */}
              <Button onClick={() => { Auth.logout(); window.location.href = '/'; }} variant="ghost" aria-label="Home" my={5} w="100%">
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
            <Flex
              display={["none", "none", "flex", "flex"]}>
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
    <Flex position="fixed" top="1rem" left="1rem" align="center" my={5}>
    <Heading>
      <Link to="/">
        Traveler
      </Link>
      <nav>{showNavigation()}</nav>
    </Heading>
    </Flex>
  );
}

export default Nav;
