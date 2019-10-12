import { Document } from 'mongoose';

import { Comment } from './comment.interface';

export interface SongComment extends Document {
  songId: number;
  comment: Comment;
  createdAt: Date;
  updatedAt: Date;
}
