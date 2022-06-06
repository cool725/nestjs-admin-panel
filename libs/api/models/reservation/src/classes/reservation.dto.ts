import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export namespace ReservationDTO {
  export class Create {
    @IsNotEmpty()
    start: string;

    @IsNotEmpty()
    end: string;

    // creator of reservation
    userId?:string|number

    profileIds:number[]
  }

  export class Update extends PartialType(Create) {
    readonly userId?:string|number
  }
}
