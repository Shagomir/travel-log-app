import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_IDEA } from "../../utils/mutations";
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
  List,
  ListItem,
  // Divider,
} from "@chakra-ui/react";

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
    <List key={ideaId}>
      <Card mb={1}>
      <ListItem >
        {/* <Divider> */}
      {ideaText}
      {/* </Divider> */}
      <Button className="idea-delete" onClick={handleDelete}>
        X
      </Button>
      </ListItem>
      </Card>
    </List>
  );
}
export default Idea;
// Path: client/src/components/Idea/index.jsx
