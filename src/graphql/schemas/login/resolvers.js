async function login(_, { data: { userName, password } }, { dataSources }) {
    return await dataSources.loginApi.login(userName, password)
}

async function logout(_, { userName }, { dataSources }) {
    return await dataSources.loginApi.logout(userName)
}

export const loginResolvers = {
    Mutation: { login, logout }
}
