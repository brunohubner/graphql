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

async function updateUser(_, { id, data }, { dataSources }) {
    return dataSources.usersApi.updateUser(id, data)
}

async function deleteUser(_, { id }, { dataSources }) {
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
