import { Post } from "../entities/Post"
import { MyContext } from "src/types"
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql"
import { User } from "src/entities/User"

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string

  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => Post)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const user = em.create(User, { username: options.username })
    await em.persistAndFlush(user)
    return "bye"
  }
}
