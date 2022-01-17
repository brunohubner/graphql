// Query resolvers
async function post(_, { id }, { dataSources }) {
    return await dataSources.postsApi.getPost(id)
}

async function posts(_, { input }, { dataSources }) {
    return await dataSources.postsApi.getPosts(input)
}

// Mutation resolvers
async function createPost(_, { data }, { dataSources }) {
    return dataSources.postsApi.createPost(data)
}

// Fields resolvers
async function user({ userId }, _, { dataSources }) {
    return dataSources.usersApi.batchLoadById(userId)
}

export const postResolvers = {
    Query: { post, posts },
    Mutation: { createPost },
    Post: { user }
}
