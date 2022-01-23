import { UsersApi } from "../graphql/schemas/users/dataSources"
import { AuthService } from "./AuthService"

function cookieParser(cookiesHeader) {
    if (typeof cookiesHeader != "string") return {}
    const cookies = cookiesHeader.split(/;\s*/)

    const parsedCookie = {}
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split("=")
        parsedCookie[key] = value
    }

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
    const { jwtToken } = cookieParser(req.headers.cookie)
    return await verifyJwtToken(jwtToken)
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

/**
 * @param { import("express").Request } req
 * @returns { Promise<string> }
 */
export async function getLoggedUserId(req) {
    let loggedUserId = ""

    if (req && req.headers) {
        if (req.headers.authorization) {
            loggedUserId = await authorizeUserWithBearerToken(req)
        }

        if (!loggedUserId && req.headers.cookie) {
            loggedUserId = await authorizeUserWithCookie(req)
        }
    }

    return loggedUserId
}
