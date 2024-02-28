import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER, QUERY_ME_BASIC } from "../utils/queries";
import Locationform from "../components/LocationForm";
import {
  useDisclosure,
  Button,
  Container,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Image,
  Text,
  AbsoluteCenter,
  Center,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";

function location() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery(QUERY_ME);
  // console.log(data);
  let user;

  if (data) {
    user = data.me;
  }
  // console.log(user);
  // if user is not logged in, redirect to login page.
  if (!user) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
  // if user has no locations, display message to create some
  if (!user.locations.length) {
    return (
      <Flex mx="auto">
        <Container pos="fixed">
          <Center>
            <Card
              boxShadow="sm"
              p="6"
              rounded="md"
              bg="white"
              direction={{ base: "column", s: "row" }}
              align="center"
              overflow="hidden"
              variant="outline"
            >
              <CardBody>
                <Heading size="md">
                  Welcome, {user.username}! You have no locations yet!
                </Heading>
              </CardBody>
            </Card>
          </Center>
          <Button onClick={onOpen}>Add Location</Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Add a Location
              </DrawerHeader>
              <div>
                <Locationform user={user} />
              </div>
            </DrawerContent>
          </Drawer>
        </Container>
      </Flex>
    );
  }
  // if user is logged in and has locations, display them
  return (
    <Flex mt={"150px"} width="100%" justifyContent="center">
      <Container mt={10} my="auto">
        <SimpleGrid columns={1} spacing={10} mb={5}>
          <Card
            boxShadow="sm"
            p="6"
            rounded="md"
            bg="white"
            direction={{ base: "column", s: "row" }}
            align="center"
            overflow="hidden"
            variant="outline"
          >
            <CardBody>
              <Heading size="md" mb={10}>
                Welcome, {user.username}! Here are your existing locations!
              </Heading>
              <Text>Click on a location to edit it.</Text>
            </CardBody>
          </Card>
        </SimpleGrid>
        <div>
          {user ? (
            <>
              {/* Trying to add a card grid here that takes in new submissions, not sure how */}
              {/* // map over locations and display them */}
              <SimpleGrid spacing={4} columns={{ sm: 1, md: 3 }}>
                {user.locations.map((location) => (
                  <Card key={location._id}>
                    <CardHeader>
                      <Heading size="md">{location.locationText}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Image src={location.imageURL} />
                    </CardBody>
                    <CardFooter>
                      <Button
                        mx="auto"
                        as={Link}
                        to={`/location/${location._id}`}
                      >
                        View here
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </SimpleGrid>
            </>
          ) : null}
        </div>
        <Button mt={5} onClick={onOpen}>
          Add Location
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Add a Location</DrawerHeader>
            <div>
              <Locationform user={user} />
            </div>
          </DrawerContent>
        </Drawer>
      </Container>
    </Flex>
  );
}

export default location;
