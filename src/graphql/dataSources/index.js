import { PostsApi } from "../schemas/posts/PostsApi"
import { UsersApi } from "../schemas/users/UsersApi"
import { LoginApi } from "../schemas/login/LoginApi"
import { CommentSQLDataSource } from "../schemas/comments/dataSources"
import { db } from "../../database"

export function dataSources() {
    return {
        postsApi: new PostsApi(),
        usersApi: new UsersApi(),
        loginApi: new LoginApi(),
        commentsDb: new CommentSQLDataSource(db)
    }
}
