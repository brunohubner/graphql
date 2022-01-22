import {
    AuthenticationError,
    UserInputError,
    ValidationError
} from "apollo-server"
import { AuthService } from "../../../../security/AuthService"
import { randomUUID } from "crypto"

function validateUserName(userName) {
    const userNameRegExp = /^[a-z]([a-z0-9_.]+)+$/gi

    if (!userName.match(userNameRegExp)) {
        throw new ValidationError("The userName must match: a-z 0-9 . _")
    }
}

function validateUserPassword(password) {
    // letters and numbers: 8-32
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[0-9]).{8,32}$/

    if (!password.match(strongPasswordRegex)) {
        throw new UserInputError(
            "Password must contain at least: " +
                "One letter, one number and 8 at 32 caracters."
        )
    }
}

async function checkUserFields(user, allFieldsRequired = false) {
    const userFields = ["firstName", "lastName", "userName", "password"]

    for (const field of userFields) {
        if (!allFieldsRequired) {
            if (typeof user[field] === "undefined") continue
        }

        if (field === "userName") validateUserName(user[field])
        if (field === "password") validateUserPassword(user[field])
        if (!user[field]) throw new Error(`User ${field} is missing!`)
    }

    if (user.password && !user.passwordHash) {
        const { password } = user
        const passwordHash = await AuthService.hashPassword(password)

        user.passwordHash = passwordHash
        delete user.password
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
    await checkUserFields(userData, true)
    const indexRefUser = await dataSource.get("", {
        _limit: 1,
        _sort: "indexRef",
        _order: "desc"
    })

    const indexRef = indexRefUser[0]?.indexRef + 1 || 1
    const foundUser = await userExists(userData.userName, dataSource)

    if (typeof foundUser !== "undefined") {
        throw new ValidationError(
            `The userName ${userData.userName} has already been taken!`
        )
    }

    return dataSource.post("", {
        id: randomUUID(),
        ...userData,
        indexRef,
        createdAt: new Date().toISOString()
    })
}

export async function updateUserFn(userId, userData, dataSource) {
    await checkUserFields(userData)

    if (userData.userName) {
        const foundUser = await userExists(userData.userName, dataSource)

        if (typeof foundUser !== "undefined" && foundUser.id !== userId) {
            throw new ValidationError(
                `The userName ${userData.userName} has already been taken!`
            )
        }
    }

    return dataSource.patch(userId, userData)
}

export async function deleteUserFn(userId, password, dataSource) {
    const resp = await dataSource.get("", { id: userId })
    const user = resp[0]

    if (!user) throw new AuthenticationError("User not found!")

    const isValidPassword = await AuthService.comparePassword(
        password,
        user.passwordHash
    )

    if (!isValidPassword) {
        throw new AuthenticationError("Password does not match!")
    }

    return !!(await dataSource.delete(userId))
}
