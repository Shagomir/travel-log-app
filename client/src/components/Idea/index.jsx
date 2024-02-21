import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_IDEA } from "../../utils/mutations";

function Idea({ locationId, ideaId, ideaText }) {
  const [deleteIdea, { error }] = useMutation(REMOVE_IDEA);
  const handleDelete = async () => {
    try {
      // remove idea from database
      const { data } = await deleteIdea({
        variables: {
          locationId: locationId,
          ideaId: ideaId,
        },
      });
      //   console.log(data);
    } catch (e) {
      console.error(e);
    }
    // Refresh the page after deleting the idea
    window.location.assign(`/location/${locationId}`);
  };

  //   The Idea component will display the idea text and a delete button.
  return (
    <li key={ideaId}>
      {ideaText}
      <button className="idea-delete" onClick={handleDelete}>
        X
      </button>
    </li>
  );
}
export default Idea;
// Path: client/src/components/Idea/index.jsx
