import { gql } from "apollo-server"

export const postTypeDefs = gql`
    extend type Query {
        post(id: ID!): Post!
    }

    extend type Query {
        posts(input: ApiFiltersInput): [Post!]!
    }

    extend type Mutation {
        createPost(data: CreatePostInput!): Post!
    }

    type Post {
        id: String!
        title: String!
        body: String!
        indexRef: Int!
        createdAt: String!
        user: User!
    }

    input CreatePostInput {
        title: String!
        body: String!
        userId: String!
    }
`
