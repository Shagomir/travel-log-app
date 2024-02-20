import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_LOCATION } from "../utils/queries";
import Auth from "../utils/auth";
import IdeaForm from "../components/IdeaForm";
import Idea from "../components/Idea";

const ListDetail = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, error, data } = useQuery(QUERY_SINGLE_LOCATION, {
    variables: { locationId: id },
  });
  console.log(data);
  const location = data?.location || {};
  const ideas = location.ideas || [];

  const handleDelete = async () => {
    window.location.assign(`/delete/${id}`);
  };

  if (Auth.loggedIn()) {
    return (
      <>
        <div>
          <h4>{location.locationText}</h4>
          <button className="location-delete" onClick={handleDelete}>
            Delete Location
          </button>
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
  return (
    <h4>
      You need to be logged in to see this. Use the navigation links above to
      sign up or log in!
    </h4>
  );
};

export default ListDetail;
