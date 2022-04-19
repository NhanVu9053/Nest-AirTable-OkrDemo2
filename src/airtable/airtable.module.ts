import { DynamicModule, Module } from '@nestjs/common';
import { AirtableCoreModule } from './airtable-core.module';
import { AirtableService } from './airtable.service';
import { AirtableModuleAsyncOptions } from './lib/interface';

@Module({
  providers: [AirtableService],
  exports: [AirtableService]
})
export class AirtableModule {
  public static forRootAsync = (
    options: AirtableModuleAsyncOptions,
  ): DynamicModule => ({
    module: AirtableModule,
    imports: [AirtableCoreModule.forRootAsync(options)],
  });
}
