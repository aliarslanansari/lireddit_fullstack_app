import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"
import { Post } from "./Post"

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  username!: string

  //Password is not exposed to GraphQL API
  @Column()
  password!: string

  @Column({ unique: true })
  email!: string

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
