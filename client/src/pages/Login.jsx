import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  AbsoluteCenter,
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
  Image,
  Stack,
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
    <AbsoluteCenter>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'>
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '250px' }}
          src='./public/hiking-logo.jpeg'
          alt='An image of a solo hiker turned away from the viewer, they wear a loose outfit with a brimmed hat and a large hiking pack.'
          borderRadius='lg'
        />
        <Stack>
          <CardBody>
            <Heading size="md" mb="3">Login</Heading>
            <form onSubmit={handleFormSubmit}>
              <FormControl>
                <FormLabel htmlFor="email">Email address:</FormLabel>
                <Input
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt="2" htmlFor="pwd">Password:</FormLabel>
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
                <Button mt={3} mb={3} type="submit">Submit</Button>
              </div>
              <Link to="/signup">← Go to Signup</Link>
            </form>
          </CardBody>
        </Stack>
      </Card>
    </AbsoluteCenter>
  );
}

export default Login;