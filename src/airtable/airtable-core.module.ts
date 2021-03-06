import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";

import { AirtableService } from "./airtable.service";
import {
  AIRTABLE_CONFIG_OPTIONS,
  AIRTABLE_CONFIG_TOKEN,
  createAirtableClient,
} from "./lib/common";
import {
  AirtableModuleAsyncOptions,
  AirtableModuleOptions,
  AirtableOptionsFactory,
} from "./lib/interface";

@Global()
@Module({
  providers: [AirtableService],
})
export class AirtableCoreModule {
  public static forRootAsync(
    options: AirtableModuleAsyncOptions,
  ): DynamicModule {
    const provider: Provider = {
      inject: [AIRTABLE_CONFIG_OPTIONS],
      provide: AIRTABLE_CONFIG_TOKEN,
      useFactory: (options: AirtableModuleOptions) =>
        createAirtableClient(options),
    };

    return {
      exports: [provider],
      imports: options.imports,
      module: AirtableCoreModule,
      providers: [...this.createAsyncProviders(options), provider],
    };
  }

  private static createAsyncProviders(
    options: AirtableModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<AirtableOptionsFactory>;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AirtableModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: AIRTABLE_CONFIG_OPTIONS,
        useFactory: options.useFactory,
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<AirtableOptionsFactory>,
    ];

    return {
      provide: AIRTABLE_CONFIG_OPTIONS,
      useFactory: async (optionsFactory: AirtableOptionsFactory) =>
        await optionsFactory.createAirtableOptions(),
      inject,
    };
  }
}
