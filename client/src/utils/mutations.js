import { gql } from "@apollo/client";

// pass in the email and password as arguments to the login mutation
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
// pass in the username, email, and password as arguments to the addUser mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
// pass in the locationText and locationAuthor as arguments to the addLocation mutation
export const ADD_LOCATION = gql`
  mutation addLocation($locationText: String!, $locationAuthor: String!) {
    addLocation(locationText: $locationText, locationAuthor: $locationAuthor) {
      _id
      locationText
      locationAuthor
      createdAt
      ideas {
        _id
        ideaText
      }
    }
  }
`;
// pass in the locationId, ideaText, and ideaAuthor as arguments to the addIdea mutation
export const ADD_IDEA = gql`
  mutation addIdea($locationId: ID!, $ideaText: String!, $ideaAuthor: String) {
    addIdea(
      locationId: $locationId
      ideaText: $ideaText
      ideaAuthor: $ideaAuthor
    ) {
      _id
      locationText
      locationAuthor
      createdAt
      ideas {
        _id
        ideaText
        createdAt
      }
    }
  }
`;
// pass in the locationId as an argument to the removeLocation mutation
export const REMOVE_LOCATION = gql`
  mutation removeLocation($locationId: ID!) {
    removeLocation(locationId: $locationId) {
      _id
      locationText
      locationAuthor
      createdAt
      ideas {
        _id
        ideaText
      }
    }
  }
`;

// pass in the locationId and ideaId as arguments to the removeIdea mutation
export const REMOVE_IDEA = gql`
  mutation removeIdea($locationId: ID!, $ideaId: ID!) {
    removeIdea(locationId: $locationId, ideaId: $ideaId) {
      _id
      locationText
      locationAuthor
      createdAt
      ideas {
        _id
        ideaText
      }
    }
  }
`;


//path: client/src/utils/mutations.js