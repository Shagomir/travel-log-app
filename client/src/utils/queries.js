import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      locations {
        _id
        locationtText
        createdAt
      }
    }
  }
`;

export const QUERY_Locations = gql`
  query getLocations {
    locations {
      _id
      locationText
      locationAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_LOCATION = gql`
  query getSingleLocation($locationId: ID!) {
    location(locationId: $locationId) {
      _id
      locationText
      locationAuthor
      createdAt
      ideas {
        _id
        ideaText
        ideaAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      locations {
        _id
        locationText
        locationAuthor
        createdAt
      }
    }
  }
`;