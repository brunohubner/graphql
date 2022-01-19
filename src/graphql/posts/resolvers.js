import { AuthenticationError } from "apollo-server"

// Query resolvers
async function post(_, { id }, { dataSources, loggedUserId }) {
    if (!loggedUserId) throw new AuthenticationError("You must be logged!")
    return await dataSources.postsApi.getPost(id)
}

async function posts(_, { input }, { dataSources, loggedUserId }) {
    if (!loggedUserId) throw new AuthenticationError("You must be logged!")
    return await dataSources.postsApi.getPosts(input)
}

// Mutation resolvers
async function createPost(_, { data }, { dataSources, loggedUserId }) {
    if (!loggedUserId) throw new AuthenticationError("You must be logged!")
    const postData = { ...data, ...{ userId: loggedUserId } }
    return dataSources.postsApi.createPost(postData)
}

async function updatePost(_, { postId, data }, { dataSources, loggedUserId }) {
    if (!loggedUserId) throw new AuthenticationError("You must be logged!")
    const postData = { ...data, ...{ userId: loggedUserId } }
    return dataSources.postsApi.updatePost(postId, postData)
}

async function deletePost(_, { postId }, { dataSources, loggedUserId }) {
    if (!loggedUserId) throw new AuthenticationError("You must be logged!")
    return dataSources.postsApi.deletePost(postId, loggedUserId)
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
