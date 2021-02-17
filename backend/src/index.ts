import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants"
import microConfig from "./mikro-orm.config"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"
import redis from "redis"
import session from "express-session"
import connectRedis from "connect-redis"
import { MyContext } from "./types"
import cors from "cors"
import { sendMail } from "./utils/sendEmail"

const main = async () => {
  sendMail("bob@bob.com", "hello there")
  const orm = await MikroORM.init(microConfig)
  await orm.getMigrator().up()

  const app = express()
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient()
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  )
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
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
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
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
