import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SongComment } from 'src/models/interfaces/song-comment.interface';

import { Comment } from '../models/interfaces/comment.interface';
import { VComment, VSongComment } from '../models/validation/comment.validation';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':songId')
  async listCommentsBySong(
    @Param('songId', new ParseIntPipe()) songId: number,
  ): Promise<SongComment[]> {
    return await this.commentService.listCommentsBySong(songId);
  }

  @Post('song')
  async addSongComment(@Body() data: VSongComment): Promise<SongComment> {
    return await this.commentService.addCommentToSong(data);
  }

  @Post()
  async addComment(@Body() data: VComment): Promise<Comment> {
    return await this.commentService.addComment(data);
  }
}
