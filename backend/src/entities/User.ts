import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field()
  @Column({ unique: true })
  username!: string

  //Password is not exposed to GraphQL API
  @Column()
  password!: string

  @Column({ unique: true })
  email!: string
}
