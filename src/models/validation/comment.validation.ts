import { IsNotEmpty, IsNumber, IsMongoId, IsString } from 'class-validator';

export class VComment {
  @IsMongoId()
  commentId: string;

  @IsMongoId()
  songCommentId: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class VSongComment {
  @IsNumber()
  songId: number;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
