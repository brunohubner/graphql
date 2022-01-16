import { api } from "../../http/api"

export async function getUsers(params = "") {
    try {
        const resp = await api.get("/users/" + params)
        return resp.data
    } catch (err) {
        return undefined
    }
}
