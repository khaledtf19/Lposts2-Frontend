import { IsEmail, IsNotEmpty, MinLength, Length } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Length(1, 50)
  avatar: string;
}

export class UserDto {
  _id: ObjectId;
  name: string;
  email?: string;
  avatar?: string;
  password?: string;
  posts?: ObjectId[];
  followers?: ObjectId[];
  following?: ObjectId[];
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

export class FollowUserDto {
  @IsNotEmpty()
  userId: string;
}

export class CreateUserResponseDto {
  data: { email: string; _id: ObjectId; name: string };
}

export class UpdateUserResponseDto {
  data: { name: string | undefined; email: string | undefined };
}
