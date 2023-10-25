import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AccountsModule } from './accounts/accounts.module';
import { SharedJwtModule } from '@app/shared-jwt';
// import { SharedJWTModule } from './accounts/auth/sharedJWT/sharedJWT.module';

@Module({
  imports: [
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
