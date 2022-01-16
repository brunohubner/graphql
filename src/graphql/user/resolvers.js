import { getUrlParams } from "../../utils/getUrlParams"

async function user(_, { id }, { getUsers }) {
    return await getUsers(id)
}

async function users(_, { input }, { getUsers }) {
    return await getUsers("?" + getUrlParams(input))
}

export const userResolvers = {
    Query: { user, users }
}
