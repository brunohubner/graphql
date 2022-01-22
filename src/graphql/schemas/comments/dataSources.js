import { SQLDataSource } from "../../dataSources/SQLDataSource"
import { ValidationError } from "apollo-server"
import { randomUUID } from "crypto"

function normalizeComment(comment) {
    return {
        id: comment.id,
        comment: comment.comment,
        userId: comment.user_id,
        postId: comment.post_id,
        createdAt: comment.created_at
    }
}

function normalizeComments(comments) {
    return comments.map(normalizeComment)
}

export class CommentSQLDataSource extends SQLDataSource {
    constructor(dbConnection) {
        super(dbConnection)
        this.tableName = "comments"
    }

    async getById(id) {
        const resp = await this.db(this.tableName).where({ id })
        return normalizeComment(resp[0])
    }

    async getCommentsByPostId(post_id) {
        const comments = await this.db(this.tableName).where({ post_id })
        return normalizeComments(comments)
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
        const exixts = await this.db(this.tableName).where(partialComment)

        if (exixts.length) {
            throw new ValidationError("Comment already created!")
        }

        partialComment.id = randomUUID()
        await this.db(this.tableName).insert(partialComment)
        return await this.getById(partialComment.id)
    }

    async batchLoaderCallback(post_ids) {
        const query = this.db(this.tableName).whereIn("post_id", post_ids)
        const comments = await query

        return post_ids.map(post_id => {
            return comments
                .filter(comment => comment.post_id === post_id)
                .map(normalizeComment)
        })
    }
}
