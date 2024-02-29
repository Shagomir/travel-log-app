import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { UPDATE_LOCATION } from "../../utils/mutations";
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

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
        locationText: formState.locationText,
        locationAuthor: location.locationAuthor,
        geolocation: formState.geolocation,
        imageURL: formState.imageURL,
      };
      if (formState.locationText === "") {
        newLocation.locationText = location.locationText;
        // console.log("LOCATION NULL");
      }
      if (formState.geolocation === "") {
        newLocation.geolocation = location.geolocation;
        // console.log("GEOLOCATION NULL");
      }
      if (formState.imageURL === "") {
        newLocation.imageURL = location.imageURL;
        // console.log("IMAGE NULL");
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
      //   console.log("returned data:", data);

      // Clear form value
    } catch (error) {
      console.error(error);
    }
    window.location.assign(`/location/${location._id}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // console.log(name, value);
  };

  return (
    <Card mt="4">
      <CardBody>
        <form onSubmit={handleSubmit}>
          <FormControl className="flex-row space-between my-2">
            <FormLabel htmlFor="idea">Name:</FormLabel>
            <Input
              type="text"
              name="locationText"
              defaultValue={location.locationText}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mt="2" className="flex-row space-between my-2">
            <FormLabel htmlFor="idea">Geolocation:</FormLabel>
            <Input
              type="text"
              name="geolocation"
              defaultValue={location.geolocation}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className="flex-row space-between my-2">
            <FormLabel htmlFor="idea">Image URL:</FormLabel>
            <Input
              type="text"
              name="imageURL"
              defaultValue={location.imageURL}
              onChange={handleChange}
            />
          </FormControl>
          <Button
          type="submit"
          mt="4"
          mb="2"
          colorScheme='green'
          variant='outline'>
            Save
          </Button>
        </form>
        {error && <div>Something went wrong...</div>}
      </CardBody>
    </Card>
  );
};

export default EditForm;
