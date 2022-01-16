import { getUrlParams } from "../../utils/getUrlParams"

async function user(_, { id }, { getUsers }) {
    return await getUsers(id)
}

async function users(_, { input }, { getUsers }) {
    return await getUsers("?" + getUrlParams(input))
}

async function posts({ id }, _, { postsDataloader }) {
    return postsDataloader.load(id)
}

export const userResolvers = {
    Query: { user, users },
    User: { posts }
}
