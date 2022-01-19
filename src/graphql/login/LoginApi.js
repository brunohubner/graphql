import { RESTDataSource } from "apollo-datasource-rest"
import { AuthenticationError } from "apollo-server"
import { API_URL } from "../../http/API_URL"
import { AuthService } from "../../security/AuthService"

export class LoginApi extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = API_URL + "/users/"
    }

    async login(userName, password) {
        const resp = await this.get(
            "",
            { userName },
            { cacheOptions: { ttl: 0 } }
        )

        const user = resp[0]
        if (!user) throw new AuthenticationError("User does not exists!")

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
}
