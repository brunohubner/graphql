import { PostsApi } from "./posts/PostsApi"
import { UsersApi } from "./users/UsersApi"

export function dataSources() {
    return {
        postsApi: new PostsApi(),
        usersApi: new UsersApi()
    }
}
