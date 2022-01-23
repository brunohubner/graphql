import { getLoggedUserId } from "../../security/getLoggedUserId"

export async function context({ req, res }) {
    const loggedUserId = await getLoggedUserId(req)
    return { loggedUserId, res }
}
