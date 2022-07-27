import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  })
  friends: [mongoose.Schema.Types.ObjectId];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  })
  posts: [{ type: mongoose.Schema.Types.ObjectId; ref: "Post" }];
}

export const UserSchema = SchemaFactory.createForClass(User);
