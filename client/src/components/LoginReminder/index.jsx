import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Flex, Heading } from "@chakra-ui/react";

const LoginReminder = () => {
  return (
    <Flex mt={"150px"} width="100%" justifyContent="center">
      <Container mt={10} my="auto">
        <Heading size="md">
          You need to be logged in to see this. Use the links below to sign up
          or log in!
        </Heading>
        <Flex justifyContent="center" m={5}>
          <Button m={5} as={Link} to="/signup">
            Sign Up
          </Button>
          <Button m={5} as={Link} to="/login">
            Log In
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
};

export default LoginReminder;
