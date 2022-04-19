import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { AirtableService } from 'src/airtable/airtable.service';
import { CreateOkrDto } from './dto/create-okr.dto';
import { OkrRequestOptions } from './interface/okr-request-options.interface';
import { Okr } from './interface/okr.interface';
import { FieldSet, Record, Records } from "airtable";


@Injectable()
export class OkrService {

    airtableTableName = "okr";
    constructor(private airtableService: AirtableService) {}

  create = async (
    createOkrDto: CreateOkrDto,
    options?: OkrRequestOptions,
  ): Promise<Okr | Record<FieldSet>> => {
    try {
      const record = await this.airtableService.createRecord(
        this.airtableTableName,
        createOkrDto,
      );
      return options?.returnAirtableRecord
        ? record
        : this.okrEntityFromAirtableRecord(record);
    } catch (error) {
      switch (error.statusCode) {
        case 422:
          throw new HttpException(
            error.message,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        default:
          throw error;
      }
    }
  };

  findAll = async (
    options?: OkrRequestOptions,
  ): Promise<Okr[] | Records<FieldSet>> => {
    try {
      const records = await this.airtableService.findAllRecords(
        this.airtableTableName,
      );
      if (options?.returnAirtableRecord) {
        return records;
      } else {
        return records.map((record) =>
          this.okrEntityFromAirtableRecord(record),
        );
      }
    } catch (error) {
      switch (error.statusCode) {
        case 404:
          throw new NotFoundException(
            `Table '${
              this.airtableTableName
            }' not found in Base '${this.airtableService.getBaseId()}'`,
          );
        default:
          throw error;
      }
    }
  };

  find = async (
    id: string,
    options?: OkrRequestOptions,
  ): Promise<Okr | Record<FieldSet>> => {
    try {
      const record = await this.airtableService.findRecordById(
        this.airtableTableName,
        id,
      );
      return options?.returnAirtableRecord
        ? record
        : this.okrEntityFromAirtableRecord(record);
    } catch (error) {
      switch (error.statusCode) {
        case 404:
          throw new NotFoundException(
            `${id} not found in ${
              this.airtableTableName
            } in ${this.airtableService.getBaseId()}`,
          );
        default:
          throw error;
      }
    }
  };

  update = async (
    id: string,
    createDto: CreateOkrDto,
    options?: OkrRequestOptions,
  ): Promise<Okr | Record<FieldSet>> => {
    try {
      const record = await this.airtableService.findRecordByIdAndUpdate(
        this.airtableTableName,
        id,
        createDto,
      );
      return options?.returnAirtableRecord
        ? record
        : this.okrEntityFromAirtableRecord(record);
    } catch (error) {
      switch (error.statusCode) {
        case 404:
          throw new NotFoundException(
            `Okr '${id}' not found in Table '${
              this.airtableTableName
            }' in Base '${this.airtableService.getBaseId()}'`,
          );
        case 422:
          throw new HttpException(
            error.message,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        default:
          throw error;
      }
    }
  };

  delete = async (id: string) => {
    try {
      await this.airtableService.findRecordByIdAndDelete(
        this.airtableTableName,
        id,
      );
    } catch (error) {
      switch (error.statusCode) {
        case 404:
          throw new NotFoundException(
            `Okr '${id}' not found in Table '${
              this.airtableTableName
            }' in Base '${this.airtableService.getBaseId()}'`,
          );
        default:
          throw error;
      }
    }
  };

  okrEntityFromAirtableRecord = (record: Record<FieldSet>): Okr => ({
    id: record.getId(),
    name: record.get("name") as string,
    // isComplete: !!record.get("isComplete"),
  });
}
