import { AuthService } from "../../security/AuthService"
import { UsersApi } from "../schemas/users/dataSources"

function cookieParser(cookiesHeader) {
    // The final goal is to return an object with key/value reflecting
    // the cookies. So, this functions always returns an object.

    // If we do not receive a string, we won't do anything.
    if (typeof cookiesHeader != "string") return {}

    const cookies = cookiesHeader.split(/;\s*/)

    // If we have something similar to cookie, we want to add them
    // to the final object
    const parsedCookie = {}
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split("=")
        parsedCookie[key] = value
    }

    // The reason I'm using JSON here is to make sure the final
    // object won't have any undefined value.
    return JSON.parse(JSON.stringify(parsedCookie))
}

async function verifyJwtToken(token) {
    try {
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

async function authorizeUserWithCookie(req) {
    if (req.headers.cookie) {
        const { jwtToken } = cookieParser(req.headers.cookie)
        return await verifyJwtToken(jwtToken)
    }
    return ""
}

async function authorizeUserWithBearerToken(req) {
    try {
        const bearerToken = req.headers.authorization || "Bearer token"
        const token = bearerToken.split(" ")[1]

        return await verifyJwtToken(token)
    } catch (err) {
        return ""
    }
}

export async function context({ req, res }) {
    let loggedUserId = ""

    loggedUserId = await authorizeUserWithBearerToken(req)
    if (!loggedUserId) loggedUserId = await authorizeUserWithCookie(req)

    return { loggedUserId, res }
}
