import { SQLDataSource } from "../../dataSources/SQLDataSource"
import { ValidationError } from "apollo-server"
import { randomUUID } from "crypto"

export class CommentSQLDataSource extends SQLDataSource {
    constructor(dbConnection) {
        super(dbConnection)
    }

    async getById(id) {
        const resp = await this.db("comments").where({ id })
        const data = resp[0]

        return {
            id: data.id,
            comment: data.comment,
            userId: data.user_id,
            postId: data.post_id,
            createdAt: data.created_at
        }
    }

    async create({ userId, postId, comment }) {
        try {
            await this.context.dataSources.postsApi.getPost(postId)
        } catch (e) {
            throw new ValidationError("Post not found!")
        }

        const partialComment = {
            comment,
            user_id: userId,
            post_id: postId
        }
        const exixts = await this.db("comments").where(partialComment)

        if (exixts.length) {
            throw new ValidationError("Comment already created!")
        }

        partialComment.id = randomUUID()
        await this.db("comments").insert(partialComment)
        return await this.getById(partialComment.id)
    }
}
