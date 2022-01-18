import { gql } from "apollo-server"

export const postTypeDefs = gql`
    extend type Query {
        post(id: ID!): Post!
        posts(input: ApiFiltersInput): [Post!]!
    }

    extend type Mutation {
        createPost(data: CreatePostInput!): Post!
        updatePost(postId: ID!, data: UpdatePostInput!): Post!
        deletePost(postId: ID!): Boolean!
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

    input UpdatePostInput {
        title: String
        body: String
        userId: String
    }
`
