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
  mutation addLocation($locationText: String!) {
    addLocation(locationText: $locationText) {
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
  mutation addIdea($locationId: ID!, $ideaText: String!) {
    addIdea(locationId: $locationId, ideaText: $ideaText) {
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
