import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { DComment } from '../models/dtos/comment.dto';
import { DSongComment } from '../models/dtos/song-comment.dto';
import { VComment, VSongComment } from '../models/validation/comment.validation';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':songId')
  async listCommentsBySong(
    @Param('songId', new ParseIntPipe()) songId: number,
  ): Promise<DSongComment[]> {
    return (await this.commentService.listCommentsBySong(songId)).map(
      c => new DSongComment(c),
    );
  }

  @Post('song')
  async addSongComment(@Body() data: VSongComment): Promise<DSongComment> {
    return new DSongComment(await this.commentService.addCommentToSong(data));
  }

  @Post()
  async addComment(@Body() data: VComment): Promise<DComment> {
    return new DComment(await this.commentService.addComment(data));
  }
}
