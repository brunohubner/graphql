import { gql } from "apollo-server"
import { apiFiltersResolvers } from "./apiFilters/resolvers"
import { apiFiltersTypeDefs } from "./apiFilters/typeDefs"
import { postResolvers } from "./posts/resolvers"
import { postTypeDefs } from "./posts/typeDefs"
import { userResolvers } from "./users/resolvers"
import { userTypeDefs } from "./users/typeDefs"

const rootTypeDefs = gql`
    type Query {
        _empty: Boolean
    }
`

const rootResolvers = {
    Query: {
        _empty: () => true
    }
}

export const typeDefs = [
    rootTypeDefs,
    userTypeDefs,
    postTypeDefs,
    apiFiltersTypeDefs
]
export const resolvers = [
    rootResolvers,
    userResolvers,
    postResolvers,
    apiFiltersResolvers
]
