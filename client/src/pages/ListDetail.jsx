import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_LOCATION } from "../utils/queries";
import Auth from "../utils/auth";
import IdeaForm from "../components/IdeaForm";
import Idea from "../components/Idea";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Card,
  Image,
  Container,
} from "@chakra-ui/react";
import EditForm from "../components/EditForm";

const ListDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEdit, setIsEdit] = useState(false);

  // const { isOpenAddIdea, onOpenAddIdea, onCloseAddIdea } = useDisclosure();
  // let isEdit = false;
  const { id } = useParams();
  // console.log(id);
  //   The useQuery hook allows us to make a query request to the server, and it automatically fetches the data and loading state for us.
  const { loading, error, data } = useQuery(QUERY_SINGLE_LOCATION, {
    variables: { locationId: id },
  });
  // console.log(data);
  //   The data object returned from useQuery is an object with a key of data that contains the data returned from the server. If it is falsey, make sure it is null. If it is truthy, destructure the location data from it.
  const location = data?.location || {};
  const ideas = location.ideas || [];

  const EditButton = () => {
    setIsEdit(true);
  };

  const AddIdeaButton = () => {
    setIsEdit(false);
  };

  //   redirect to confirm page if user deletes the location
  const handleDelete = async () => {
    window.location.assign(`/delete/${id}`);
  };

  // if user is logged in, display the location and its ideas
  if (Auth.loggedIn()) {
    return (
      <>
        <Container mt={"150px"}>
          <Card width="90%" margin="auto">
            <div>
              <h4>{location.locationText}</h4>
              <p>{location.geolocation}</p>

              {location.imageURL && (
                <Image
                  src={location.imageURL}
                  alt="Location Image"
                  my={5}
                  mx={"auto"}
                  width="60%"
                />
              )}
              <Button
                className="location-edit"
                onMouseEnter={EditButton}
                onClick={onOpen}
                m={5}
              >
                Edit Location
              </Button>

              <Button className="location-delete" onClick={handleDelete} m={5}>
                Delete Location
              </Button>
              <ul>
                {ideas.map((idea) => (
                  // console.log(idea),
                  <Idea
                    key={idea._id}
                    locationId={id}
                    ideaId={idea._id}
                    ideaText={idea.ideaText}
                  />
                ))}
              </ul>
            </div>
            <Button onMouseEnter={AddIdeaButton} onClick={onOpen} m={5}>
              Add an Idea
            </Button>
          </Card>
        </Container>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              {isEdit ? "Edit Location" : "Add an Idea"}
            </DrawerHeader>
            <DrawerBody>
              {isEdit ? (
                <EditForm location={location} />
              ) : (
                <IdeaForm
                  locationId={location._id}
                  user={location.locationAuthor}
                />
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  // if user is not logged in, display message to log in
  return (
    <h4>
      You need to be logged in to see this. Use the navigation links above to
      sign up or log in!
    </h4>
  );
};

export default ListDetail;
