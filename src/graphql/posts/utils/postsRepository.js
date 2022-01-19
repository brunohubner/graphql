import { ValidationError } from "apollo-server"
import { randomUUID } from "crypto"

export async function createPostFn(postData, dataSource) {
    const postDataInfo = await createPostInfo(postData, dataSource)
    const { title, body } = postDataInfo

    if (!title || !body) {
        throw new ValidationError("You have to send title and body!")
    }
    return dataSource.post("", postDataInfo)
}

export async function updatePostFn(postId, postData, dataSource) {
    if (!postId) throw new ValidationError("Post id is missing!")
    const post = await dataSource.get(postId)

    if (!post || post?.userId !== postData.userId) {
        throw new ValidationError("You cannot delete this post")
    }

    const { title, body } = postData

    if (typeof title !== "undefined") {
        if (!title) throw new ValidationError("Post title is missing")
    }
    if (typeof body !== "undefined") {
        if (!body) throw new ValidationError("Post body is missing")
    }

    return await dataSource.patch(postId, postData)
}

export async function deletePostFn(postId, userId, dataSource) {
    if (!postId) throw new ValidationError("Post id is missing")
    const post = await dataSource.get(postId)

    if (!post || post?.userId !== userId) {
        throw new ValidationError("You cannot delete this post")
    }

    const deleted = await dataSource.delete(postId)
    return !!deleted
}

export async function createPostInfo(postData, dataSource) {
    const { title, body, userId } = postData

    const indexRefPost = await dataSource.get("", {
        _limit: 1,
        _sort: "indexRef",
        _order: "desc"
    })

    const indexRef = indexRefPost[0]?.indexRef + 1 || 1
    return {
        id: randomUUID(),
        title,
        body,
        userId,
        indexRef,
        createdAt: new Date().toISOString()
    }
}
