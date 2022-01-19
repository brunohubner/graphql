import { AuthService } from "../security/AuthService"

function authorizeUser(req) {
    try {
        const bearerToken = req.headers.authorization || "Bearer token"
        const token = bearerToken.split(" ")[1]
        const { userId } = AuthService.decodeToken(token)

        return userId
    } catch (err) {
        return ""
    }
}

export function context({ req }) {
    const loggedUserId = authorizeUser(req)
    return { loggedUserId }
}
