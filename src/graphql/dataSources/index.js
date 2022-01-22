import { PostsApi } from "../schemas/posts/PostsApi"
import { UsersApi } from "../schemas/users/UsersApi"
import { LoginApi } from "../schemas/login/LoginApi"

export function dataSources() {
    return {
        postsApi: new PostsApi(),
        usersApi: new UsersApi(),
        loginApi: new LoginApi()
    }
}
