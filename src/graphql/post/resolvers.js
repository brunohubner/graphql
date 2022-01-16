import { getUrlParams } from "../../utils/getUrlParams"

async function post(_, { id }, { getPosts }) {
    return await getPosts(id)
}

async function posts(_, { input }, { getPosts }) {
    return await getPosts("?" + getUrlParams(input))
}

async function user({ userId }, _, { getUsers }) {
    return await getUsers(userId)
}

export const postResolvers = {
    Query: { post, posts },
    Post: { user }
}
