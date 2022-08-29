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
  CreateUserResponseDto,
  UpdateUserEmailDto,
  UpdateUserNameDto,
  UserDto,
  UpdateUserResponseDto,
} from "./dto/users.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async showProfile(@Request() req: any): Promise<{ data: UserDto }> {
    return { data: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findUserById(@Param("id") id: string): Promise<UserDto> {
    return this.userService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("name")
  async updateUserName(
    @Request() req: any,
    @Body() body: UpdateUserNameDto,
  ): Promise<UpdateUserResponseDto> {
    return this.userService.updateName(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put("email")
  async updateUserEmail(
    @Request() req: any,
    @Body() body: UpdateUserEmailDto,
  ): Promise<UpdateUserResponseDto> {
    return this.userService.updateEmail(req.user, body);
  }
}
