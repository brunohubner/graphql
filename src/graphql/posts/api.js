import { api } from "../../http/api"

export async function getPosts(params = "") {
    try {
        const resp = await api.get("/posts/" + params)
        return resp.data
    } catch (err) {
        return undefined
    }
}
