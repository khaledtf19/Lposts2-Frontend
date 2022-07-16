import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/users/dto/users.dto";
import { User } from "src/users/models/user.schema";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log("email", email);
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === pass) {
      const result = { _id: user._id, email: user.email, name: user.name };
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { email: user.email, _id: user._id, name: user.name };
    return { data: { access_token: this.jwtService.sign(payload) } };
  }
}
