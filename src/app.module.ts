import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AccountsModule } from './accounts/accounts.module';
import { SharedJwtModule } from '@app/shared-jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { SharedJWTModule } from './accounts/auth/sharedJWT/sharedJWT.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // https://docs.nestjs.com/techniques/events
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    ServeStaticModule.forRoot({
      renderPath: '/',
      rootPath: join(__dirname, '..', 'client'),
    }),
    AccountsModule,
    SharedJwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
