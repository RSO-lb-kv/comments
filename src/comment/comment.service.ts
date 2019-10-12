import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from '../models/interfaces/comment.interface';
import { SongComment } from '../models/interfaces/song-comment.interface';
import { VComment, VSongComment } from '../models/validation/comment.validation';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('SongComment') private songComment: Model<SongComment>,
    @InjectModel('Comment') private comment: Model<Comment>,
  ) {}

  async listCommentsBySong(songId: number) {
    return await this.songComment.find({ songId }).sort({ createdAt: -1 });
  }

  async addCommentToSong(data: VSongComment) {
    const songComment = new this.songComment({
      songId: data.songId,
      comment: new this.comment({
        author: data.author,
        text: data.text,
        comments: [],
      }),
    });
    return await songComment.save();
  }

  async addComment(data: VComment) {
    const songComment = await this.songComment.findById(data.songCommentId);
    if (!songComment)
      throw new NotFoundException(
        `SongComment with id ${data.songCommentId} not found.`,
      );
    const comment = this.findComment(songComment.comment, data.commentId);
    if (!comment)
      throw new NotFoundException(
        `Comment with id ${data.commentId} not found.`,
      );
    const newComment = new this.comment({
      author: data.author,
      text: data.text,
      comments: [],
    });
    comment.comments.push(newComment);
    await songComment.save();
    return newComment;
  }

  private findComment(comment: Comment, id: string): Comment {
    if (comment.id === id) return comment;
    if (!comment.comments || !comment.comments.length) return null;
    for (const c of comment.comments) {
      const found = this.findComment(c, id);
      if (found) return found;
    }
    return null;
  }
}
