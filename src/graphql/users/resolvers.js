import { AuthenticationError } from "apollo-server"

// Query resolvers
async function user(_, { id }, { dataSources }) {
    return await dataSources.usersApi.getUser(id)
}

async function users(_, { input }, { dataSources }) {
    return await dataSources.usersApi.getUsers(input)
}

// Mutation resolvers
async function createUser(_, { data }, { dataSources }) {
    return dataSources.usersApi.createUser(data)
}

async function updateUser(_, { id, data }, { dataSources, loggedUserId }) {
    if (!loggedUserId) throw new AuthenticationError("You must be logged!")
    if (id !== loggedUserId) {
        throw new AuthenticationError("You cannot update this user!")
    }
    return dataSources.usersApi.updateUser(id, data)
}

async function deleteUser(_, { id }, { dataSources, loggedUserId }) {
    if (id !== loggedUserId) {
        throw new AuthenticationError("You cannot delete this user!")
    }
    return dataSources.usersApi.deleteUser(id)
}

// Fields resolvers
async function posts({ id }, _, { dataSources }) {
    return dataSources.postsApi.batchLoadById(id)
}

export const userResolvers = {
    Query: { user, users },
    Mutation: { createUser, updateUser, deleteUser },
    User: { posts }
}
