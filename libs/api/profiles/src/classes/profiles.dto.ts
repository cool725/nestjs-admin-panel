import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export namespace ProfilesDto {
  export class Create {
    @IsNotEmpty()
    gender: string;

    firstName: string;
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    phone: string;
  }

  export class Update extends PartialType(Create) {
    @IsNotEmpty()
    @IsNumber()
    profileId: string;
  }
}
