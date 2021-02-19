import { MikroORM } from "@mikro-orm/core"
import { ApolloServer } from "apollo-server-express"
import connectRedis from "connect-redis"
import cors from "cors"
import express from "express"
import session from "express-session"
import Redis from "ioredis"
import { buildSchema } from "type-graphql"
import { __prod__ } from "./constants"
import microConfig from "./mikro-orm.config"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"
import { MyContext } from "./types"

const main = async () => {
  const orm = await MikroORM.init(microConfig)
  await orm.getMigrator().up()

  const app = express()
  const RedisStore = connectRedis(session)
  const redis = new Redis()
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  )
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redis, disableTouch: true }),
      saveUninitialized: false,
      secret: "keyboard dog",
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: __prod__, //cookie only works in https
        sameSite: "lax", // csrf
      },
    })
  )
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res, redis }),
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  app.listen(4000, () => {
    console.log("Server started on localhost:4000")
  })
}

main().catch((err) => {
  console.log(err)
})
