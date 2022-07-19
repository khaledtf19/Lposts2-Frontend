import {
  Injectable,
  HttpException,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  CreateUserDto,
  UserDto,
  UpdateUserDto,
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

  async update(user: UserDto, updateUserDto: UpdateUserDto) {
    if (!updateUserDto.name && !updateUserDto.email) {
      throw new ForbiddenException();
    }

    return await this.userModel
      .findByIdAndUpdate(user._id, {
        name: updateUserDto.name,
        email: updateUserDto.email,
      })
      .exec();
  }

  async updateName(user: UserDto, updateUserNameDto: UpdateUserNameDto) {}

  async updateEmail(user: UserDto, updateUserEmailDto: UpdateUserEmailDto) {}
}
