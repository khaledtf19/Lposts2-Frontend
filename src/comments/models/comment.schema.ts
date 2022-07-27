import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, Document } from "mongoose";

export type CommentDocument = Document & Comment;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true })
  postId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  commentContent: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  owner: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 0 })
  likes: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  })
  whoLike: [mongoose.Schema.Types.ObjectId];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
