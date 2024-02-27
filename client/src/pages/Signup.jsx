import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import {
  AbsoluteCenter,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Image,
  Input,
  Stack,
} from '@chakra-ui/react';

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // create user in database
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    // create the token and store it in localStorage so the user is signed in after signing up
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  //   The signup form will allow users to sign up for the application.
  return (
    <AbsoluteCenter>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'>
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '250px' }}
          src='./assets/hiking-logo.jpeg'
          alt='An image of a solo hiker turned away from the viewer, they wear a loose outfit with a brimmed hat and a large hiking pack.'
          borderRadius='lg'
        />
        <Stack>
          <form onSubmit={handleFormSubmit}>
            <CardBody>
              <Heading size="md" mb="3">Sign Up</Heading>
              <FormControl>
                <FormLabel htmlFor="username">User Name:</FormLabel>
                <Input
                  placeholder="User Name"
                  name="username"
                  type="username"
                  id="username"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt="2" htmlFor="email">Email:</FormLabel>
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
              <div>
                <Button mt="3" mb="3" type="submit">Submit</Button>
              </div>
              <Link to="/login">← Go to Login</Link>
            </CardBody>
            </form>
        </Stack>
    </Card>
    </AbsoluteCenter >
  );
}

export default Signup;