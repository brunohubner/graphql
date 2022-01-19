import { isLogged } from "../login/isLogged"

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

async function updateUser(_, { data }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    return dataSources.usersApi.updateUser(loggedUserId, data)
}

async function deleteUser(_, { password }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    return dataSources.usersApi.deleteUser(loggedUserId, password)
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
