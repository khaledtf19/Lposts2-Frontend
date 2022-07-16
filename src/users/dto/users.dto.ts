import { IsEmail, IsNotEmpty, MinLength, Length } from "class-validator";

export class CreateUserDto {
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
  _id: string;
  name: string;
  email: string;
  password: string;
  posts: [] | any;
  friends: [] | any;
}
