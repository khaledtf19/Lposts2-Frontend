import {
  Injectable,
  HttpException,
  HttpStatus,
  NotAcceptableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreateUserDto,
  UserDto,
  UpdateUserNameDto,
  UpdateUserEmailDto,
} from "./dto/users.dto";
import { User, UserDocument } from "./models/user.schema";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async findOneById(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    if (createUserDto.password !== createUserDto.confirmation) {
      throw new HttpException(
        "Password doesn't match the confirmation...",
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashPassword;

    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new NotAcceptableException();
    }

    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async updateName(
    user: UserDto,
    updateUserNameDto: UpdateUserNameDto,
  ): Promise<UserDto> {
    return await this.userModel.findByIdAndUpdate(user._id, {
      name: updateUserNameDto.name,
    });
  }

  async updateEmail(
    user: UserDto,
    updateUserEmailDto: UpdateUserEmailDto,
  ): Promise<UserDto> {
    return await this.userModel.findByIdAndUpdate(user._id, {
      email: updateUserEmailDto.email,
    });
  }
}
