import { IsNotEmpty, Length } from "class-validator";
import { ObjectId } from "mongoose";
import { UserDto } from "src/users/dto/users.dto";

export class PostDto {
  postContent: string;

  owner: ObjectId | UserDto;

  likes: number;

  whoLike: ObjectId[];

  comments?: ObjectId[];
}

export class CreatePostDto {
  @IsNotEmpty()
  @Length(1, 255)
  postContent: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  @Length(1, 255)
  postContent: string;
}
