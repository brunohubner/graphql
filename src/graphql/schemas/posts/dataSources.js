import { RESTDataSource } from "apollo-datasource-rest"
import { API_URL } from "../../../http/API_URL"
import { createPostsDataloader } from "./dataloaders"
import {
    createPostFn,
    deletePostFn,
    updatePostFn
} from "./utils/postsRepository"

export class PostsApi extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = API_URL + "/posts/"
        this.dataloader = createPostsDataloader(this.getPosts.bind(this))
    }

    async getPosts(urlParams = {}) {
        return this.get("", urlParams, {
            cacheOptions: { ttl: 0 /* segs */ }
        })
    }

    async getPost(postId) {
        return this.get(postId, undefined, {
            cacheOptions: { ttl: 0 /* segs */ }
        })
    }

    async createPost(postData) {
        return await createPostFn(postData, this)
    }

    async updatePost(postId, postData) {
        return await updatePostFn(postId, postData, this)
    }

    async deletePost(postId) {
        return await deletePostFn(postId, this)
    }

    batchLoadById(postId) {
        return this.dataloader.load(postId)
    }
}
