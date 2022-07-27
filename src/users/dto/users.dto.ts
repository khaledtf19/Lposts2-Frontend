import { IsEmail, IsNotEmpty, MinLength, Length } from "class-validator";
import * as mongoose from "mongoose";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  confirmation: string;

  @IsNotEmpty()
  @Length(3, 50)
  name: string;
}

export class UserDto {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  posts: [] | any;
  friends: [] | any;
}

export class UpdateUserNameDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
}

export class UpdateUserEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
