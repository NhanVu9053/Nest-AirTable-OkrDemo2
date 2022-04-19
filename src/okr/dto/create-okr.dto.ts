import { IsString } from "class-validator";

export class CreateOkrDto {
  @IsString()
  readonly name: string;
}
