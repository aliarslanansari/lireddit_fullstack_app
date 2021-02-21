import { ApolloServer } from "apollo-server-express"
import connectRedis from "connect-redis"
import cors from "cors"
import express from "express"
import session from "express-session"
import Redis from "ioredis"
import path from "path"
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm"
import { __prod__ } from "./constants"
import { Post } from "./entities/Post"
import { User } from "./entities/User"
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"
import { MyContext } from "./types"

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "lireddit2",
    username: "postgres",
    password: "password",
    logging: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: true,
    entities: [Post, User],
  })

  conn.runMigrations()

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
    context: ({ req, res }): MyContext => ({ req, res, redis }),
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
