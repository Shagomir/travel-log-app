import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import Locationform from "../components/LocationForm";

function location() {
  const { data } = useQuery(QUERY_ME);
  // console.log(data);
  let user;

  if (data) {
    user = data.me;
  }
  // console.log(user);

  if (!user) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (!user.locations.length) {
    return (
      <div className="container my-1">
        <h4>Welcome, {user.username}! You have no locations yet!</h4>
        <Locationform user={user} />
      </div>
    );
  }

  return (
    <>
      <div className="container my-1">
        {user ? (
          <>
            <h4>Welcome, {user.username}! Here are your existing locations!</h4>
            <p>Click on a location to edit it.</p>
            {user.locations.map((location) => (
              <div key={location._id} className="my-2">
                <Link to={`/location/${location._id}`}>
                  {location.locationText}
                </Link>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <div className="container my-1">
        <Locationform user={user} />
      </div>
    </>
  );
}

export default location;
