import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirtableModule } from './airtable/airtable.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OkrModule } from './okr/okr.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AirtableModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          apiKey: configService.get<string>("AIRTABLE_API_KEY"),
          baseId: configService.get<string>("AIRTABLE_BASE_ID"),
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OkrModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
