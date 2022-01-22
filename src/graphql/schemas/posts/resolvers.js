import { isLogged } from "../login/isLogged"

// Query resolvers
async function post(_, { postId }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    return await dataSources.postsApi.getPost(postId)
}

async function posts(_, { input }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    return await dataSources.postsApi.getPosts(input)
}

// Mutation resolvers
async function createPost(_, { data }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    data.userId = loggedUserId
    return dataSources.postsApi.createPost(data)
}

async function updatePost(_, { postId, data }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    data.userId = loggedUserId
    return dataSources.postsApi.updatePost(postId, data)
}

async function deletePost(_, { postId }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    return dataSources.postsApi.deletePost(postId)
}

// Fields resolvers
async function user({ userId }, _, { dataSources }) {
    return dataSources.usersApi.batchLoadById(userId)
}

async function comments({ id }, _, { dataSources }) {
    return await dataSources.commentsDb.batchLoad(id)
}

export const postResolvers = {
    Query: { post, posts },
    Mutation: { createPost, updatePost, deletePost },
    Post: { user, comments }
}
