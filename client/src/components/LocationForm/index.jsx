import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_LOCATION } from "../../utils/mutations";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
} from "@chakra-ui/react";

function Locationform({ user }) {
  const [formState, setFormState] = useState({ newLocation: "" });
  const [addLocation, { error }] = useMutation(ADD_LOCATION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add location to database
      const { data } = await addLocation({
        variables: {
          locationText: formState.newLocation,
          locationAuthor: user.username,
          geolocation: formState.geolocation,
          imageURL: formState.imageURL,
        },
      });
      console.log(data);
      // Clear form value
      setFormState({ newLocation: "" });
    } catch (e) {
      console.error(e);
    }
    // Refresh the page after adding the location
    window.location.assign("/location");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //   The LocationForm component will allow users to add a new location to the database.
  return (
    <Card mt="4">
      <CardBody>
        <form onSubmit={handleFormSubmit}>
          <FormControl className="flex-row space-between my-2">
            <FormLabel htmlFor="location">Enter New Location:</FormLabel>
            <Input
              placeholder="Yellowstone National Park"
              name="newLocation"
              type="newLocation"
              id="newLocation"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className="flex-row space-between my-2">
            <FormLabel htmlFor="geolocation">Enter Geolocation:</FormLabel>
            <Input
              placeholder="44° 35′ 47″ N, 110° 32′ 50″ W"
              name="geolocation"
              type="geolocation"
              id="geolocation"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl className="flex-row space-between my-2">
            <FormLabel htmlFor="location">Enter Image URL:</FormLabel>
            <Input
              placeholder="https://imagelocation.com"
              name="imageURL"
              type="imageURL"
              id="imageURL"
              onChange={handleChange}
            />
          </FormControl>
          <div className="flex-row flex-end">
            <Button type="submit" mt="2" mb="2">
              Add Location
            </Button>
          </div>
        </form>
        {error && <div>Something went wrong...</div>}
      </CardBody>
    </Card>
  );
}

export default Locationform;
