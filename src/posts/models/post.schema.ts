import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

export type PostDocument = Document & Post;

@Schema()
export class Post {
  @Prop({ required: true })
  postContent: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  owner: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  updated: Date;

  @Prop({ default: 0 })
  likes: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  })
  whoLike: [mongoose.Schema.Types.ObjectId];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    default: [],
  })
  comments: [mongoose.Schema.Types.ObjectId];
}

export const PostSchema = SchemaFactory.createForClass(Post);
