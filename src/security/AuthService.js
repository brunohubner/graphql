import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_AUTH_SECRET = process.env.JWT_AUTH_SECRET

export class AuthService {
    static async hashPassword(password, salt = 10) {
        return await bcrypt.hash(password, salt)
    }

    static async comparePassword(password, passswordHash) {
        return await bcrypt.compare(password, passswordHash)
    }

    static generateToken(payload) {
        return jwt.sign({ ...payload }, JWT_AUTH_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
    }

    static decodeToken(token) {
        return jwt.verify(token, JWT_AUTH_SECRET)
    }
}
