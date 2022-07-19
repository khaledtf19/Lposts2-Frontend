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
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async showProfile(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Request() req: any, @Body() body: UpdateUserDto) {
    return this.userService.update(req.user, body);
  }
}
