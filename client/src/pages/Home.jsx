import {
  Button,
  Container,
  Center
} from "@chakra-ui/react";

const Home = () => {
  // If the user is already logged in, redirect to the location page
  if (localStorage.getItem("id_token")) {
    window.location.assign("/location");
  }
  // If the user is not logged in, display the home page
  return (
    <Container mt={"300px"}>
      <Center>
        <Button
          colorScheme='green'
          variant='outline'>
          <a href="/login">Please Log In!</a>
        </Button>
      </Center>
    </Container>
  );
};

export default Home;
