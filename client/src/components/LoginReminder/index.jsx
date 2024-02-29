import React from "react";
import { Link } from "react-router-dom";
import theme from "/src/theme.js";
import {
  Button,
  Container,
  Flex,
  Heading,
  Card
} from "@chakra-ui/react";

const boxShadow = `${theme.shadows.xl}, ${theme.shadows.green}`;

const LoginReminder = () => {
  return (
    <Flex mt={"150px"} width="100%" justifyContent="center">
      <Container mt={10} my="auto">
        <Card
          boxShadow={boxShadow}
          mt={10}
          p="6">
          <Heading size="md">
            You need to be logged in to see this. Use the links below to sign up
            or log in!
          </Heading>
        </Card>
        <Flex justifyContent="center" m={5}>
          <Button
            colorScheme='green'
            variant='outline'
            m={5}
            as={Link}
            to="/signup">
            Sign Up
          </Button>
          <Button
            colorScheme='green'
            variant='outline'
            m={5}
            as={Link}
            to="/login">
            Log In
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
};

export default LoginReminder;
