const Home = () => {
  // If the user is already logged in, redirect to the location page
  if (localStorage.getItem("id_token")) {
    window.location.assign("/location");
  }
  // If the user is not logged in, display the home page
  return (
    <div className="container">
      <a href="/login">Please Log In!</a>
    </div>
  );
};

export default Home;
