import { Module } from '@nestjs/common';
import { OkrService } from './okr.service';
import { OkrController } from './okr.controller';
import { AirtableModule } from 'src/airtable/airtable.module';

@Module({
  imports: [AirtableModule],
  providers: [OkrService],
  controllers: [OkrController]
})
export class OkrModule {}
