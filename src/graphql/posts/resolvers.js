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

async function updatePost(_, { postId, data }, { dataSources }) {
    return dataSources.postsApi.updatePost(postId, data)
}

async function deletePost(_, { postId }, { dataSources }) {
    return dataSources.postsApi.deletePost(postId)
}

// Fields resolvers
async function user({ userId }, _, { dataSources }) {
    return dataSources.usersApi.batchLoadById(userId)
}

export const postResolvers = {
    Query: { post, posts },
    Mutation: { createPost, updatePost, deletePost },
    Post: { user }
}
