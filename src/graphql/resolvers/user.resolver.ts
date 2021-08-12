import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  getUsers(): Boolean {
    return true;
  }
}
