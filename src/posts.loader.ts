import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class PostsLoader {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}

  public readonly batchPosts = new DataLoader<number, Post[]>(
    async (userIds: number[]) => {
      console.log('Fetching posts for user IDs:', userIds);
      const posts = await this.postRepo.find();
      return userIds.map((userId) =>
        posts.filter((post) => post.userId === userId),
      );
    },
  );
}
