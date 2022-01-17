import { ValidationError } from "apollo-server"

async function userExists(userId, dataSources) {
    try {
        await dataSources.context.dataSources.usersApi.getUser(userId)
    } catch (err) {
        throw new ValidationError(`User ${userId} does not exists!`)
    }
}

export async function createPostFn(postData, dataSources) {
    const postDataInfo = await createPostInfo(postData, dataSources)
    const { title, body, userId } = postDataInfo

    if (!title || !body || !userId) {
        throw new ValidationError("You have to send title, body and userId!")
    }

    return dataSources.post("", postDataInfo)
}

export async function createPostInfo(postData, dataSources) {
    const { title, body, userId } = postData

    await userExists(userId, dataSources)

    const indexRefPost = await dataSources.get("", {
        _limit: 1,
        _sort: "indexRef",
        _order: "desc"
    })

    const indexRef = indexRefPost[0].indexRef + 1

    return {
        title,
        body,
        userId,
        indexRef,
        createdAt: new Date().toISOString()
    }
}
