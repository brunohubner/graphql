import { isLogged } from "../login/isLogged"

async function createComment(_, { data }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    const { comment, postId } = data

    return await dataSources.commentsDb.create({
        comment,
        postId,
        userId: loggedUserId
    })
}

async function user({ userId }, _, { dataSources }) {
    return await dataSources.usersApi.batchLoadById(userId)
}

export const commentResolvers = {
    Mutation: { createComment },
    Comment: { user }
}
