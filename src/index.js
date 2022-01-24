import "dotenv/config"
import express from "express"
import { createServer } from "http"
import { execute, subscribe } from "graphql"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { ApolloServer } from "apollo-server-express"
import { resolvers, typeDefs } from "./graphql/schemas"
import { context } from "./graphql/context"
import { dataSources } from "./graphql/dataSources"
import { getLoggedUserId } from "./security/getLoggedUserId"

async function init() {
    const PORT = process.env.PORT || 4444
    const app = express()
    const httpServer = createServer(app)
    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
            onConnect: async (_connectionParams, webSocket, _context) => {
                return {
                    loggedUserId: await getLoggedUserId(webSocket.upgradeReq),
                    dataSources: dataSources()
                }
            },
            keepAlive: 10000 // 10 seconds
        },
        { server: httpServer, path: "/graphql" }
    )

    const server = new ApolloServer({
        schema,
        context,
        dataSources,
        plugins: [
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        }
                    }
                }
            }
        ]
    })
    await server.start()
    server.applyMiddleware({
        app,
        cors: { credentials: true, origin: "https://studio.apollographql.com" }
    })

    httpServer.listen(PORT, () =>
        // eslint-disable-next-line no-console
        console.log(`Server is now running on http://localhost:${PORT}/graphql`)
    )
}

init()
