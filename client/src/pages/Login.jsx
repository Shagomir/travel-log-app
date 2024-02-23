import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
} from '@chakra-ui/react';

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // execute login mutation and pass in variable data from form
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //   The login form will allow users to log in to the application.
  return (
    <Box display="flex" alignItems="center">
      <Card>
        <CardBody>
          <Heading size="md" mb="2">Login</Heading>
          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pwd">Password:</FormLabel>
              <Input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </FormControl>
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}
            <div>
              <Button mt={2} mb={2} type="submit">Submit</Button>
            </div>
            <Link to="/signup">← Go to Signup</Link>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
}

export default Login;
