import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_LOCATION } from "../../utils/mutations";

function Locationform({ user }) {
  const [formState, setFormState] = useState({ newLocation: "" });
  const [addLocation, { error }] = useMutation(ADD_LOCATION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addLocation({
        variables: {
          locationText: formState.newLocation,
          locationAuthor: user.username,
        },
      });
      console.log(data);
      setFormState({ newLocation: "" });
    } catch (e) {
      console.error(e);
    }
    window.location.assign("/location");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <h3>Add a Location</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="location">Enter New Location:</label>
          <input
            placeholder="Yellowsone National Park"
            name="newLocation"
            type="newLocation"
            id="newLocation"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Add Location</button>
        </div>
      </form>
      {error && <div>Something went wrong...</div>}
    </div>
  );
}

export default Locationform;
