import { Document } from 'mongoose';

export interface Comment extends Document {
  author: string;
  text: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}
