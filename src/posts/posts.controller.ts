import {
  Get,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Put,
  Delete,
  Param,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { CreatePostDto, UpdatePostDto } from "./dto/post.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllPosts() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("user/:userId")
  getAllUserPosts(@Param("userId") userId: string) {
    return this.postsService.findAllUserPosts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Request() req: any, @Body() body: CreatePostDto) {
    return this.postsService.create(req.user._id, body.postContent);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findPostById(@Param("id") id: string) {
    return this.postsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updatePost(
    @Param("id") id: string,
    @Request() req: any,
    @Body() body: UpdatePostDto,
  ) {
    return this.postsService.update(req.user, id, body.postContent);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deletePost(@Param("id") id: string, @Request() req: any) {
    return this.postsService.delete(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("like/:id")
  likePost(@Param("id") id: string, @Request() req: any) {
    return this.postsService.like(req.user, id);
  }
}
