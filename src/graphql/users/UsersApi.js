import { RESTDataSource } from "apollo-datasource-rest"
import { API_URL } from "../../http/API_URL"
import { createUsersDataloader } from "./dataloaders"

export class UsersApi extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = API_URL + "/users/"
        this.dataloader = createUsersDataloader(this.getUsers.bind(this))
    }

    async getUsers(urlParams = {}) {
        return this.get("", urlParams, {
            cacheOptions: { ttl: 60 /* segs */ }
        })
    }

    async getUser(id) {
        return this.get(id, undefined, {
            cacheOptions: { ttl: 60 /* segs */ }
        })
    }

    batchLoadById(id) {
        return this.dataloader.load(id)
    }
}
