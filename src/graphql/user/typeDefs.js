import { gql } from "apollo-server"

export const userTypeDefs = gql`
    extend type Query {
        user(id: ID!): User!
    }

    extend type Query {
        users(input: ApiFiltersInput): [User!]!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        userName: String!
        indexRef: Int!
        createdAt: String!
        # posts: [Posts!]!
    }
`
