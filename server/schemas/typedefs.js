const typeDefs = `
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;
