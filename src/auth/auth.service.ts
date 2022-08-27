import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/users/dto/users.dto";
import { UsersService } from "src/users/users.service";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await compare(pass, user.password))) {
      const result = {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      };
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = {
      email: user.email,
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
    };
    console.log(user);
    return { data: { access_token: this.jwtService.sign(payload) } };
  }
}
