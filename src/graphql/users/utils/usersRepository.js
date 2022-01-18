import { ValidationError } from "apollo-server"

function validateUserName(userName) {
    const userNameRegExp = /^[a-z]([a-z0-9_.]+)+$/gi

    if (!userName.match(userNameRegExp)) {
        throw new ValidationError("The userName must match: a-z 0-9 . _")
    }
}

function checkUserFields(user, allFieldsRequired = false) {
    const userFields = ["firstName", "lastName", "userName"]

    for (const field of userFields) {
        if (!allFieldsRequired) {
            if (typeof user[field] === "undefined") continue
        }

        if (field === "userName") validateUserName(user[field])

        if (!user[field]) throw new Error(`User ${field} is missing!`)
    }
}

async function userExists(userName, dataSource) {
    // /users/?userName=nameSerched
    const found = await dataSource.get("", {
        userName
    })
    return found[0]
}

export async function createUserFn(userData, dataSource) {
    checkUserFields(userData, true)

    const indexRefUser = await dataSource.get("", {
        _limit: 1,
        _sort: "indexRef",
        _order: "desc"
    })

    const indexRef = indexRefUser[0].indexRef + 1

    const foundUser = await userExists(userData.userName, dataSource)

    if (typeof foundUser !== "undefined") {
        throw new ValidationError(
            `The userName ${userData.userName} has already been taken!`
        )
    }

    return dataSource.post("", {
        ...userData,
        indexRef,
        createdAt: new Date().toISOString()
    })
}

export async function updateUserFn(id, userData, dataSource) {
    checkUserFields(userData)

    if (!id) throw new ValidationError("User id is missing!")

    if (userData.userName) {
        const foundUser = await userExists(userData.userName, dataSource)

        if (typeof foundUser !== "undefined" && foundUser.id !== id) {
            throw new ValidationError(
                `The userName ${userData.userName} has already been taken!`
            )
        }
    }

    return dataSource.patch(id, userData)
}

export async function deleteUserFn(id, dataSource) {
    if (!id) throw new ValidationError("User id is missing")
    return !!(await dataSource.delete(id))
}
