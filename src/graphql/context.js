import { api } from "../http/api"

async function getUsers(params = "") {
    try {
        const resp = await api.get("/users/" + params)
        return resp.data
    } catch (err) {
        return undefined
    }
}

async function getPosts(params = "") {
    try {
        const resp = await api.get("/posts/" + params)
        return resp.data
    } catch (err) {
        return undefined
    }
}

export function context() {
    return {
        getUsers,
        getPosts
    }
}
