import { IsNotEmpty, Length } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @Length(1, 255)
  postContent: string;
}

export class UpdatePost {}
