async function login(_, { data: { userName, password } }, { dataSources }) {
    return await dataSources.loginApi.login(userName, password)
}

export const loginResolvers = {
    Mutation: { login }
}
