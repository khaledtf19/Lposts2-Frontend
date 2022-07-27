import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { CommentsService } from "./comments.service";
import { CreateCommentDto, UpdateCommentDto } from "./dto/comment.dto";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get("post/:id")
  allPostComments(@Param("id") postId: string) {
    return this.commentsService.findPostComments(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("post/:id")
  createComment(
    @Param("id") postId: string,
    @Request() req: any,
    @Body() body: CreateCommentDto,
  ) {
    return this.commentsService.create(
      req.user._id,
      postId,
      body.commentContent,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  updateComment(
    @Param("id") commentId: string,
    @Request() req: any,
    @Body() body: UpdateCommentDto,
  ) {
    return this.commentsService.update(
      req.user._id,
      commentId,
      body.commentContent,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteComment(@Param("id") commentId: string, @Request() req: any) {
    return this.commentsService.delete(req.user._id, commentId);
  }

  @UseGuards(JwtAuthGuard)
  @Put("like/:id")
  likeComment(@Param("id") commentId: string, @Request() req: any) {
    return this.commentsService.like(req.user, commentId);
  }
}
