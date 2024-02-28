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
        <Flex>
          <Flex>
            <Link position="fixed" my={0} zIndex={-2} to="/">
              <Image
                width="200px"
                height="auto"
                src="./assets/traveler-logo.png"
              />
            </Link>
            <Nav />
          </Flex>
          <main className="main">
            <Outlet />
          </main>
        </Flex>
      </PageProvider>
    </ApolloProvider>
  );
}

export default App;
