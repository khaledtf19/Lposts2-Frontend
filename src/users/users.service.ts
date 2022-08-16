import {
  Injectable,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreateUserDto,
  CreateUserResponseDto,
  UserDto,
  UpdateUserNameDto,
  UpdateUserEmailDto,
  UpdateUserResponseDto,
} from "./dto/users.dto";
import { User, UserDocument } from "./models/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneById(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id).exec();
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      return;
    }
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      password: user.password,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException(
        "Password doesn't match confirm password...",
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
    createUser.save();
    return {
      data: {
        email: createUser.email,
        name: createUser.name,
        _id: createUser._id,
      },
    };
  }

  async updateName(
    user: UserDto,
    updateUserNameDto: UpdateUserNameDto,
  ): Promise<UpdateUserResponseDto> {
    const updateUser = await this.userModel.findByIdAndUpdate(user._id, {
      name: updateUserNameDto.name,
    });
    return { data: { email: updateUser.email, name: updateUser.name } };
  }

  async updateEmail(
    user: UserDto,
    updateUserEmailDto: UpdateUserEmailDto,
  ): Promise<UpdateUserResponseDto> {
    const updateUser = await this.userModel.findByIdAndUpdate(user._id, {
      email: updateUserEmailDto.email,
    });
    return { data: { email: updateUser.email, name: updateUser.name } };
  }
}
