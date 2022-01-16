import { ApolloServer } from "apollo-server"
import { context } from "./graphql/context"
import { resolvers, typeDefs } from "./graphql/schema"

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
})

server.listen(3334).then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server listen at ${url}`)
})
