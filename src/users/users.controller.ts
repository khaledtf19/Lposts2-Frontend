import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Put,
  Param,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import {
  CreateUserDto,
  UpdateUserEmailDto,
  UpdateUserNameDto,
  UserDto,
} from "./dto/users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async showProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findUserById(@Param("id") id: string) {
    return this.userService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("name")
  async updateUserName(
    @Request() req: any,
    @Body() body: UpdateUserNameDto,
  ): Promise<UserDto> {
    return this.userService.updateName(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put("email")
  async updateUserEmail(
    @Request() req: any,
    @Body() body: UpdateUserEmailDto,
  ): Promise<UserDto> {
    return this.userService.updateEmail(req.user, body);
  }
}
