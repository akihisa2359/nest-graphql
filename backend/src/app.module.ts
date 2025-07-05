import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Post } from './post.entity';
import { PostResolver } from './post.resolver';
import { PostsLoader } from './posts.loader';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [User, Post],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Post]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver, PostResolver, PostsLoader],
})
export class AppModule {}
