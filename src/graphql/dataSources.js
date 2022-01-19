import { PostsApi } from "./posts/PostsApi"
import { UsersApi } from "./users/UsersApi"
import { LoginApi } from "./login/LoginApi"

export function dataSources() {
    return {
        postsApi: new PostsApi(),
        usersApi: new UsersApi(),
        loginApi: new LoginApi()
    }
}
