const path = require("path")
const dotenv = require("dotenv")

const dotenvFilePath = path.resolve(__dirname, "..", "..", ".env")
dotenv.config({ path: dotenvFilePath })

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: process.env.DATABASE_CLIENT || "mysql2",
    connection: {
        host: process.env.DATABASE_HOST || "127.0.0.1",
        database: process.env.DATABASE_NAME || "graphql_fundamentals",
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "123456",
        port: parseInt(process.env.DATABASE_PORT || "3306")
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: "knex_migrations",
        directory: path.resolve(__dirname, "migrations")
    }
}
