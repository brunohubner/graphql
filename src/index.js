import "dotenv/config"
import { ApolloServer } from "apollo-server"
import { context } from "./graphql/context"
import { resolvers, typeDefs } from "./graphql/schema"
import { dataSources } from "./graphql/dataSources"

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    dataSources
})

server.listen(3334).then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server listen at ${url}`)
})
