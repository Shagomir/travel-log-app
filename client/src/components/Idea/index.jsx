import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_IDEA } from "../../utils/mutations";

function Idea({ locationId, ideaId, ideaText }) {
  const [deleteIdea, { error }] = useMutation(REMOVE_IDEA);
  const handleDelete = async () => {
    try {
      const { data } = await deleteIdea({
        variables: {
          locationId: locationId,
          ideaId: ideaId,
        },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
    window.location.assign(`/location/${locationId}`);
  };

  return (
    <li key={ideaId}>
      {ideaText}
      <button class="idea-delete" onClick={handleDelete}>
        X
      </button>
    </li>
  );
}
export default Idea;
// Path: client/src/components/Idea/index.jsx
