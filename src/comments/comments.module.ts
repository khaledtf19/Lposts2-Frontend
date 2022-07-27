import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "./models/comment.schema";
import { Post, PostSchema } from "src/posts/models/post.schema";
import { User, UserSchema } from "src/users/models/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
