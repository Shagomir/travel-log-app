import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_IDEA } from "../../utils/mutations";

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
        console.log(data);
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

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="idea">New Idea: </label>
          <input
            placeholder="Take a hike"
            name="newIdea"
            type="newIdea"
            id="newIdea"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Add Idea</button>
        </div>
      </form>
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default IdeaForm;
