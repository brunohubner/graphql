import { RESTDataSource } from "apollo-datasource-rest"
import { API_URL } from "../../http/API_URL"
import { createPostsDataloader } from "./dataloaders"

export class PostsApi extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = API_URL + "/posts/"
        this.dataloader = createPostsDataloader(this.getPosts.bind(this))
    }

    async getPosts(urlParams = {}) {
        return this.get("", urlParams, {
            cacheOptions: { ttl: 60 /* segs */ }
        })
    }

    async getPost(id) {
        return this.get(id, undefined, {
            cacheOptions: { ttl: 60 /* segs */ }
        })
    }

    batchLoadById(id) {
        return this.dataloader.load(id)
    }
}
