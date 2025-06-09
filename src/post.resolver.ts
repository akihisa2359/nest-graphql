import { Resolver, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postRepo.find();
  }
}
