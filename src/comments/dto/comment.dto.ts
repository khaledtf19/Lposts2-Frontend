import { IsNotEmpty, Length } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @Length(1, 255)
  commentContent: string;
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @Length(1, 255)
  commentContent: string;
}
