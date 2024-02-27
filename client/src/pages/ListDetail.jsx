import React from "react";
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
} from "@chakra-ui/react";
import EditForm from "../components/EditForm";

const ListDetail = () => {
  const { isOpenEdit, onOpenEdit, onCloseEdit } = useDisclosure();
  const { isOpenAddIdea, onOpenAddIdea, onCloseAddIdea } = useDisclosure();

  const { id } = useParams();
  console.log(id);
  //   The useQuery hook allows us to make a query request to the server, and it automatically fetches the data and loading state for us.
  const { loading, error, data } = useQuery(QUERY_SINGLE_LOCATION, {
    variables: { locationId: id },
  });
  // console.log(data);
  //   The data object returned from useQuery is an object with a key of data that contains the data returned from the server. If it is falsey, make sure it is null. If it is truthy, destructure the location data from it.
  const location = data?.location || {};
  const ideas = location.ideas || [];

  const handleEdit = async () => {
    window.location.assign(`/edit/${id}`);
  };

  //   redirect to confirm page if user deletes the location
  const handleDelete = async () => {
    window.location.assign(`/delete/${id}`);
  };

  // if user is logged in, display the location and its ideas
  if (Auth.loggedIn()) {
    return (
      <>
        <div>
          <h4>{location.locationText}</h4>
          <p>{location.geolocation}</p>
          {location.imageURL && (
            <img src={location.imageURL} alt="Location Image" />
          )}
          <Button className="location-edit" onClick={() => { handleEdit(); onOpenEdit(); }}>
            Edit Location
          </Button>
          <Drawer
            isOpen={isOpenEdit || isOpenAddIdea}
            placement='right'
            onClose={() => {
              if (isOpenEdit) {
                onCloseEdit();
              } else if (isOpenAddIdea) {
                onCloseAddIdea();
              }
            }}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth='1px'>
                {isOpenEdit ? 'Edit Location' : 'Add an Idea'}
              </DrawerHeader>
              <DrawerBody>
                {isOpenEdit ? (<EditForm location={location} />) : (<IdeaForm locationId={location._id} user={location.locationAuthor} />)}
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Button className="location-delete" onClick={handleDelete}>
            Delete Location
          </Button>
          <ul>
            {ideas.map(
              (idea) => (
                console.log(idea),
                (
                  <Idea
                    key={idea._id}
                    locationId={id}
                    ideaId={idea._id}
                    ideaText={idea.ideaText}
                  />
                )
              )
            )}
          </ul>
        </div>
        <Button onClick={onOpenAddIdea}>Add an Idea</Button>
        {/* <div>
          <Drawer isOpen={isOpenAddIdea} placement="right" onClose={onCloseAddIdea}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">Add an Idea</DrawerHeader>
              <div>
                <IdeaForm
                  locationId={location._id}
                  user={location.locationAuthor}
                />
              </div>
            </DrawerContent>
          </Drawer>
        </div> */}

        <EditForm location={location} />
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
