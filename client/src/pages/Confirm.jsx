import React from "react";
import { REMOVE_LOCATION } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

const Confirm = () => {
  const { id: locationId } = useParams();
  console.log(locationId);
  const [deleteIdea, { error }] = useMutation(REMOVE_LOCATION);

  const handleDelete = () => {
    try {
      const { data } = deleteIdea({
        variables: {
          locationId: locationId,
        },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
    window.location.assign(`/location/`);
  };

  const handleCancel = () => {
    window.location.assign(`/location/${locationId}`);
  };

  return (
    <>
      <h4>This will delete the location and all of its ideas! Are you sure?</h4>

      <button className="location-delete" onClick={handleCancel}>
        No, I changed my mind!
      </button>
      <button className="location-delete" onClick={handleDelete}>
        Yes, delete it!
      </button>
    </>
  );
};

export default Confirm;
