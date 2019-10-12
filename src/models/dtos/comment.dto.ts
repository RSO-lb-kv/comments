import { Comment } from '../interfaces/comment.interface';

export class DComment {
  commentId: string;
  author: string;
  text: string;
  comments: DComment[];
  updatedAt: Date;
  createdAt: Date;

  constructor(comment: Comment) {
    this.commentId = comment.id;
    this.author = comment.author;
    this.text = comment.text;
    this.comments = comment.comments.map(c => new DComment(c));
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }
}
