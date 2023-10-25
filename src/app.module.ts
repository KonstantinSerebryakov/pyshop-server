import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      renderPath: '/',
      rootPath: join(__dirname, '..', 'client'),
    }),
    AccountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
