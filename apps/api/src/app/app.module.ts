import { Module } from '@nestjs/common';
import { MemeModule } from './meme/meme.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [MemeModule, ThrottlerModule.forRoot({
    throttlers: [
      {
        ttl: 300000,
        limit: 3,
      },
    ],
  }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'sigma-memer/browser'), // sigma-memer\dist\apps\sigma-memer\browser\index.html
      // exclude: ['/api*'], 
      serveStaticOptions: {
        index: false, // Disable automatic index.html
      }
    }),
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class AppModule { }
