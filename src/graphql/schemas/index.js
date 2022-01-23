import { gql } from "apollo-server"
import { apiFiltersResolvers } from "./apiFilters/resolvers"
import { apiFiltersTypeDefs } from "./apiFilters/typeDefs"
import { commentResolvers } from "./comments/resolvers"
import { commentTypeDefs } from "./comments/typeDefs"
import { loginResolvers } from "./login/resolvers"
import { loginTypeDefs } from "./login/typeDefs"
import { postResolvers } from "./posts/resolvers"
import { postTypeDefs } from "./posts/typeDefs"
import { userResolvers } from "./users/resolvers"
import { userTypeDefs } from "./users/typeDefs"

const rootTypeDefs = gql`
    type Query {
        _empty: Boolean
    }

    type Mutation {
        _empty: Boolean
    }

    type Subscription {
        _empty: Boolean
    }
`

const rootResolvers = {
    Query: {
        _empty: () => true
    },

    Mutation: {
        _empty: () => true
    },

    Subscription: {
        _empty: () => true
    }
}

export const typeDefs = [
    rootTypeDefs,
    userTypeDefs,
    postTypeDefs,
    apiFiltersTypeDefs,
    loginTypeDefs,
    commentTypeDefs
]

export const resolvers = [
    rootResolvers,
    userResolvers,
    postResolvers,
    apiFiltersResolvers,
    loginResolvers,
    commentResolvers
]
