import { PostsApi } from "../schemas/posts/dataSources"
import { UsersApi } from "../schemas/users/dataSources"
import { LoginApi } from "../schemas/login/dataSources"
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
