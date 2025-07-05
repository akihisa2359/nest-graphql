import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postRepo.find();
  }

  @ResolveField(() => User)
  async user(@Parent() post: Post): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: post.userId } });
    if (!user) {
      throw new Error(`User with ID ${post.userId} not found`);
    }
    return user;
  }
}
