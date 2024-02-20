const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    locations: [Location]!
  }

  type Location {
    _id: ID
    locationText: String
    locationAuthor: String
    createdAt: String
    ideas: [Idea]!
  }

  type Idea {
    _id: ID
    ideaText: String
    ideaAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    locations(username: String): [Location]
    location(locationId: ID!): Location
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addLocation(locationText: String!, locationAuthor: String!): Location
    addIdea(locationId: ID!, ideaText: String!): Location
    removeLocation(locationId: ID!): Location
    removeIdea(locationId: ID!, ideaId: ID!): Location
  }
`;

module.exports = typeDefs;
