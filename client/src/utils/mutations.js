import { gql } from "@apollo/client";

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
