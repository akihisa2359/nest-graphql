import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { PostsLoader } from './posts.loader';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private postsLoader: PostsLoader,
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userRepo.find();
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User): Promise<Post[]> {
    console.log('ResolveField for posts called');
    return this.postsLoader.batchPosts.load(user.id);
  }
}
