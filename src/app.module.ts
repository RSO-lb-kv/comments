import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CommentModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
  ],
})
export class AppModule {}
