import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    type: String!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    year: Int!
    rating: Float!
    inTheaters: Boolean!
  }

  type Query {
    users: UsersResult
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: String!
    type: UserType = "USER"
  }

  input UpdateUsernameInput {
    id: ID!
    username: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User!
    deleteUser(id: ID!): String
  }

  enum UserType {
    USER
    ADMIN
  }

  type UsersResultSuccess {
    users: [User!]!
  }

  type UsersResultError {
    message: String!
  }

  union UsersResult = UsersResultSuccess | UsersResultError
`;

export default typeDefs;
