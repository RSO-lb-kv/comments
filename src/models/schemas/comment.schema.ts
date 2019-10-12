import { Schema } from 'mongoose';

export const Comment = new Schema(null, { timestamps: true });
Comment.add({
  author: String,
  text: String,
  comments: [Comment],
});
