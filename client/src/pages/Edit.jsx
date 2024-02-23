import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_LOCATION } from "../utils/queries";
import { UPDATE_LOCATION } from "../utils/mutations";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

const Edit = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_SINGLE_LOCATION, {
    variables: { locationId: id },
  });
  const location = data?.location || {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [updateLocation, { error }] = useMutation(UPDATE_LOCATION);
    try {
      // add location to database
      const { data } = updateLocation({
        variables: {
          locationId: id,
          locationText: formState.newLocation,
          locationAuthor: user.username,
          geolocation: formState.geolocation,
          imageURL: formState.imageURL,
        },
      });

      const newLocation = data?.location || {};
      console.log(newLocation);

      // Clear form value
    } catch (e) {
      console.error(e);
    }
    // Refresh the page after adding the location
    window.location.assign(`/location/${id}`);
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
            value={location.locationText}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Geolocation:
          <input
            type="text"
            name="geolocation"
            value={location.geolocation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageURL"
            value={location.imageURL}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
