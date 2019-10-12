import { Schema } from 'mongoose';

import { Comment } from './comment.schema';

export const SongComment = new Schema(
  {
    songId: Number,
    comment: Comment,
  },
  { timestamps: true },
);
