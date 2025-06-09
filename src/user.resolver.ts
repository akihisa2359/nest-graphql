import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  users(): User[] {
    // 仮のデータ
    return [
      { id: 1, name: 'Taro' },
      { id: 2, name: 'Jiro' },
    ];
  }
}
