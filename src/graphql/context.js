import { AuthService } from "../security/AuthService"
import { UsersApi } from "./users/UsersApi"

async function authorizeUser(req) {
    try {
        const bearerToken = req.headers.authorization || "Bearer token"
        const token = bearerToken.split(" ")[1]
        const { userId } = AuthService.decodeToken(token)

        const usersApi = new UsersApi()
        usersApi.initialize({})

        const user = await usersApi.getUser(userId)

        if (!user || user?.token !== token) return ""

        return userId
    } catch (err) {
        return ""
    }
}

export async function context({ req }) {
    const loggedUserId = await authorizeUser(req)
    return { loggedUserId }
}
