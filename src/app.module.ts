import { BootModule } from '@nestcloud/boot';
import { NEST_BOOT, NEST_CONSUL } from '@nestcloud/common';
import { ConsulModule } from '@nestcloud/consul';
import { ServiceModule } from '@nestcloud/service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';

import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    CommentModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_URL}/${process.env.DB_NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),

    BootModule.register(
      resolve(),
      process.env.DEVELOPMENT === 'true' ? 'consul-dev.yml' : 'consul.yml',
    ),

    ConsulModule.register({ dependencies: [NEST_BOOT] }),

    ServiceModule.register({
      dependencies: [NEST_CONSUL],
      service: {
        id: 'comments-ms',
        name: 'comments-ms',
        port: +process.env.PORT,
      },
      healthCheck: {
        timeout: '1s',
        interval: '10s',
        deregistercriticalserviceafter: '30s',
        route: '/health/ready',
      } as any,
      maxRetry: 5,
      retryInterval: 5000,
    }),
  ],
})
export class AppModule {}
