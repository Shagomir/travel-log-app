import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER, QUERY_ME_BASIC } from "../utils/queries";
import Locationform from "../components/LocationForm";
import {
  useDisclosure,
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Text,
  AbsoluteCenter,
  Center,
} from '@chakra-ui/react';

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
      <div className="container my-1">
        <Center>
        <Card
          direction={{ base: 'column', s: 'row' }}
          align='center'
          overflow='hidden'
          variant='outline'>
          <CardBody>
            <Heading size="md">
              Welcome, {user.username}! You have no locations yet!
            </Heading>
          </CardBody>
        </Card>
        </Center>
        <Button onClick={onOpen}>Add Location</Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              Add a Location
            </DrawerHeader>
            <div>
              <Locationform user={user} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
  // if user is logged in and has locations, display them
  return (
    <>
      <Card
        direction={{ base: 'column', s: 'row' }}
        align='center'
        overflow='hidden'
        variant='outline'>
        <CardBody>
          <Heading size="md">
            Welcome, {user.username}! Here are your existing locations!
          </Heading>
          <Text>
            Click on a location to edit it.
          </Text>
        </CardBody>
      </Card>
      <div className="container my-1">
        {user ? (
          <>
          {/* Trying to add a card grid here that takes in new submissions, not sure how */}
            {/* // map over locations and display them */}
            {user.locations.map((location) => (
              <div key={location._id} className="my-2">
                <Link to={`/location/${location._id}`}>
                  {location.locationText}
                </Link>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <Button onClick={onOpen}>Add Location</Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Add a Location
          </DrawerHeader>
          <div>
            <Locationform user={user} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default location;
