import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Put,
  Delete,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { CreatePostDto } from "./dto/post.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Request() req: any, @Body() body: CreatePostDto) {
    return this.postsService.create(req.user._id, body.postContent);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updatePost() {}

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deletePost() {}
}
