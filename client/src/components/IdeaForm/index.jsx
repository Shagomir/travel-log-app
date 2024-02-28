import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_IDEA } from "../../utils/mutations";
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

const IdeaForm = ({ locationId, user }) => {
  console.log(locationId);
  console.log(user);
  const [formState, setFormState] = useState({ newIdea: "" });
  const [addIdea, { error }] = useMutation(ADD_IDEA);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // add idea to database
      const { data } = await addIdea({
        variables: {
          locationId: locationId,
          ideaText: formState.newIdea,
          ideaAuthor: user,
        },
      });
      console.log(data);https://github.com/Shagomir/travel-log-app/compare/image-bug
      // Clear form value
      setFormState({ newLocation: "" });
    } catch (e) {
      console.error(e);
    }
    // Refresh the page after adding the idea
    window.location.assign(`/location/${locationId}`);
  };


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //   The IdeaForm component will allow users to add a new idea to the location.
  return (
      <Card mt="4">
        <CardBody>
          <form onSubmit={handleFormSubmit}>
            <FormControl className="flex-row space-between my-2">
              <FormLabel htmlFor="idea">New Idea:</FormLabel>
              <Input
                  placeholder="Take a hike"
                  name="newIdea"
                  type="newIdea"
                  id="newIdea"
                  onChange={handleChange}
              />
            </FormControl>
            <Button
            type="submit"
            mt="4"
            mb="2"
            colorScheme='green'
            variant='outline'>
              Add New Idea
            </Button>
              {/* <div className="flex-row flex-end">
                <button type="submit">Add Idea</button>
              </div> */}
              </form>
            {error && <div>Something went wrong...</div>}
          </CardBody>
            </Card>
          );
};

          export default IdeaForm;
