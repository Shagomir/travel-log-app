import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { UPDATE_LOCATION } from "../../utils/mutations";

const EditForm = ({ location }) => {
  //   console.log("passed location", location);
  const [updateLocation, { error }] = useMutation(UPDATE_LOCATION);

  const [formState, setFormState] = useState({
    newLocation: "",
    geolocation: "",
    imageURL: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newLocation = {
        locationText: formState.newLocation,
        locationAuthor: location.locationAuthor,
        geolocation: formState.geolocation,
        imageURL: formState.imageURL,
      };
      if (formState.newLocation === "") {
        newLocation.locationText = location.locationText;
      }
      if (formState.geolocation === "") {
        newLocation.geolocation = location.geolocation;
      }
      if (formState.imageURL === "") {
        newLocation.imageURL = location.imageURL;
      }
      console.log("new location:", newLocation);
      // add location to database
      const { data } = await updateLocation({
        variables: {
          locationId: location._id,
          locationText: newLocation.locationText,
          locationAuthor: newLocation.locationAuthor,
          geolocation: newLocation.geolocation,
          imageURL: newLocation.imageURL,
        },
      });
      console.log("returned data:", data);

      // Clear form value
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(name, value);
  };

  return (
    <div>
      <h4>Edit Location</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="locationText"
            defaultValue={location.locationText}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Geolocation:
          <input
            type="text"
            name="geolocation"
            defaultValue={location.geolocation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageURL"
            defaultValue={location.imageURL}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditForm;
