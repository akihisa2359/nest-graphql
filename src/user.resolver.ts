import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userRepo.find();
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User): Promise<Post[]> {
    return this.postRepo.find({ where: { userId: user.id } });
  }
}
