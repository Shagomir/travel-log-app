import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Flex, Image, Link } from "@chakra-ui/react";

import Nav from "./components/Nav";
import { PageProvider } from "./utils/GlobalState";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PageProvider>
        <Flex height={0}>
          <Nav />
          <Flex>
            <Link position="fixed" my={0} to="/" zIndex={0}>
              <Image
                width={{ sm: "200px", md: "200px", lg: "300px", xl: "350px" }}
                height="auto"
                src="assets\traveler-logo.png"
              />
            </Link>
          </Flex>

          <Outlet />
        </Flex>
      </PageProvider>
    </ApolloProvider>
  );
}

export default App;
