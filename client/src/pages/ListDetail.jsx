import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_LOCATION } from "../utils/queries";
import Auth from "../utils/auth";
import IdeaForm from "../components/IdeaForm";
import Idea from "../components/Idea";
import { Button } from '@chakra-ui/react';

const ListDetail = () => {
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
        <div>
          <h4>Add an Idea</h4>
          <IdeaForm locationId={location._id} user={location.locationAuthor} />
        </div>
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
