import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post, PostDocument } from "./models/post.schema";

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll() {
    return await this.postModel.find().exec();
  }

  async create(owner: string, postContent: string): Promise<Post> {
    const newPost = new this.postModel({
      owner,
      postContent,
    });
    return newPost.save();
  }
}
