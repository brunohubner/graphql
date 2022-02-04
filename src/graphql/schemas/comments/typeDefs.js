import { gql } from "apollo-server"

export const commentTypeDefs = gql`
    extend type Mutation {
        createComment(data: CreateCommentInput!): Comment!
    }

    extend type Subscription {
        commentCreated: Comment!
    }

    type Comment {
        id: ID!
        comment: String!
        user: User!
        postId: String!
        createdAt: String!
    }

    input CreateCommentInput {
        comment: String!
        postId: String!
    }
`
