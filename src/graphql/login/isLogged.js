import { AuthenticationError } from "apollo-server"

export function isLogged(userId) {
    if (!userId) throw new AuthenticationError("You must be logged!")
}
