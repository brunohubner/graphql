import { isLogged } from "./isLogged"

async function login(_, { data: { userName, password } }, { dataSources }) {
    return await dataSources.loginApi.login(userName, password)
}

async function logout(_, { userName }, { dataSources, loggedUserId }) {
    isLogged(loggedUserId)
    return await dataSources.loginApi.logout(userName)
}

export const loginResolvers = {
    Mutation: { login, logout }
}
