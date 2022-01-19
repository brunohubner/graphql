import { RESTDataSource } from "apollo-datasource-rest"
import { AuthenticationError } from "apollo-server"
import { API_URL } from "../../http/API_URL"
import { AuthService } from "../../security/AuthService"

export class LoginApi extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = API_URL + "/users/"
    }

    async findUser(userName) {
        const resp = await this.get(
            "",
            { userName },
            { cacheOptions: { ttl: 0 } }
        )

        const user = resp[0]
        if (!user) throw new AuthenticationError("User does not exists!")

        return user
    }

    async login(userName, password) {
        const user = await this.findUser(userName)

        const { passwordHash, id: userId } = user
        const validPassword = await AuthService.comparePassword(
            password,
            passwordHash
        )

        if (!validPassword) throw new AuthenticationError("Incorrect password!")
        const token = AuthService.generateToken({ userId })

        await this.patch(userId, { token }, { cacheOptions: { ttl: 0 } })
        return { token, userId }
    }

    async logout(userName) {
        const user = await this.findUser(userName)

        if (user.id !== this.context.loggedUserId) {
            throw new AuthenticationError("You are not this user!")
        }

        await this.patch(user.id, { token: "" }, { cacheOptions: { ttl: 0 } })
        return true
    }
}
