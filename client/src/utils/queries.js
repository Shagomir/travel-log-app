import { gql } from "@apollo/client";
// pass in username as an argument to the user query
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      locations {
        _id
        locationtText
        geolocation
        imageURL
        createdAt
      }
    }
  }
`;
// this returns all locations by all users - not used
export const QUERY_Locations = gql`
  query getLocations {
    locations {
      _id
      locationText
      locationAuthor
      geolocation
      imageURL
      createdAt
    }
  }
`;

// this returns a single location by locationId
export const QUERY_SINGLE_LOCATION = gql`
  query getSingleLocation($locationId: ID!) {
    location(locationId: $locationId) {
      _id
      locationText
      locationAuthor
      geolocation
      imageURL
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

// this returns user data and all locations by a single user
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      locations {
        _id
        locationText
        locationAuthor
        geolocation
        imageURL
        createdAt
      }
    }
  }
`;

// this returns user data but no locations - for troubleshooting
export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
//path: client/src/utils/queries.js
