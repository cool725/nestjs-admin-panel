import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  ValidateIf,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export namespace ProfilesDto {
  export class Create {
    @IsNotEmpty()
    gender: string;

    firstName: string;
    lastName: string;

    @IsEmail()
    @IsOptional()
    @ValidateIf((self) => self.email)
    email: string;

    @IsPhoneNumber() // todo test this
    @IsOptional()
    @ValidateIf((self) => self.phone)
    phone: string;
  }

  export class Update extends PartialType(Create) {}
}
