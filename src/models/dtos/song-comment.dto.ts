import { SongComment } from '../interfaces/song-comment.interface';
import { DComment } from './comment.dto';

export class DSongComment {
  songCommentId: string;
  comment: DComment;

  constructor(songComment: SongComment) {
    this.songCommentId = songComment.id;
    this.comment = new DComment(songComment.comment);
  }
}
