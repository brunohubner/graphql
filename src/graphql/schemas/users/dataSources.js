import { RESTDataSource } from "apollo-datasource-rest"
import { API_URL } from "../../../http/API_URL"
import { createUsersDataloader } from "./dataloaders"
import {
    createUserFn,
    deleteUserFn,
    updateUserFn
} from "./utils/usersRepository"

export class UsersApi extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = API_URL + "/users/"
        this.dataloader = createUsersDataloader(this.getUsers.bind(this))
        this.initialize({})
    }

    async getUsers(urlParams = {}) {
        return this.get("", urlParams, {
            cacheOptions: { ttl: 0 /* segs */ }
        })
    }

    async getUser(userId) {
        return this.get(userId, undefined, {
            cacheOptions: { ttl: 0 /* segs */ }
        })
    }

    async createUser(userData) {
        return await createUserFn(userData, this)
    }

    async updateUser(userId, userData) {
        return await updateUserFn(userId, userData, this)
    }

    async deleteUser(userId, password) {
        return await deleteUserFn(userId, password, this)
    }

    batchLoadById(userId) {
        return this.dataloader.load(userId)
    }
}
