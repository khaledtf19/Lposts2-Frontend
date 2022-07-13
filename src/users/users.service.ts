import {
  Injectable,
  HttpException,
  HttpStatus,
  NotAcceptableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/users.dto";
import { User, UserDocument } from "./models/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.confirmation) {
      throw new HttpException(
        "Password doesn't match the confirmation...",
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new NotAcceptableException();
    }

    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }
}
