import { isLogged } from "../login/isLogged"
import { PubSub, withFilter } from "graphql-subscriptions"

// Mutations resolvers
async function createComment(_, { data }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    const { comment, postId } = data

    return await dataSources.commentsDb.create({
        comment,
        postId,
        userId: loggedUserId
    })
}

// Subscriptions resolvers
export const pubSub = new PubSub()
export const COMMENT_CREATED = "COMMENT_CREATED"

const commentCreated = {
    subscribe: withFilter(
        () => {
            return pubSub.asyncIterator(COMMENT_CREATED)
        },
        (payload, _variables, { loggedUserId }) => {
            const hasPostOwner = payload.postOwner !== null
            const postOwnerIsLoggedUser = payload.postOwner === loggedUserId
            const notIsMyPost = payload.commentCreated.userId !== loggedUserId
            const shouldNotifyUser =
                hasPostOwner && postOwnerIsLoggedUser && notIsMyPost
            return shouldNotifyUser
        }
    )
}

// Fields resolvers
async function user({ userId }, _, { dataSources }) {
    return await dataSources.usersApi.batchLoadById(userId)
}

export const commentResolvers = {
    Mutation: { createComment },
    Subscription: { commentCreated },
    Comment: { user }
}
