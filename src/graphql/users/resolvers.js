async function user(_, { id }, { dataSources }) {
    return await dataSources.usersApi.getUser(id)
}

async function users(_, { input }, { dataSources }) {
    return await dataSources.usersApi.getUsers(input)
}

async function posts({ id }, _, { dataSources }) {
    return dataSources.postsApi.batchLoadById(id)
}

export const userResolvers = {
    Query: { user, users },
    User: { posts }
}
