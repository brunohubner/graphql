import { ValidationError } from "apollo-server"
import { randomUUID } from "crypto"

async function userExists(userId, dataSource) {
    try {
        await dataSource.context.dataSources.usersApi.getUser(userId)
    } catch (err) {
        throw new ValidationError(`User ${userId} does not exists!`)
    }
}

export async function createPostFn(postData, dataSource) {
    const postDataInfo = await createPostInfo(postData, dataSource)
    const { title, body, userId } = postDataInfo

    if (!title || !body || !userId) {
        throw new ValidationError("You have to send title, body and userId!")
    }

    return dataSource.post("", postDataInfo)
}

export async function updatePostFn(postId, postData, dataSource) {
    if (!postId) throw new ValidationError("Post id is missing!")

    const { title, body, userId } = postData

    if (typeof title !== "undefined") {
        if (!title) throw new ValidationError("Post title is missing")
    }

    if (typeof body !== "undefined") {
        if (!body) throw new ValidationError("Post body is missing")
    }

    if (typeof userId !== "undefined") {
        if (!userId) throw new ValidationError("Post userId is missing")
    }

    await userExists(userId, dataSource)

    return await dataSource.patch(postId, postData)
}

export async function deletePostFn(postId, dataSource) {
    if (!postId) throw new ValidationError("Post id is missing")
    const deleted = await dataSource.delete(postId)
    return !!deleted
}

export async function createPostInfo(postData, dataSource) {
    const { title, body, userId } = postData
    await userExists(userId, dataSource)

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
