import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthUserCredentialsDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'passwordweak',
  })
  password: string;

  //Current Device ID
  uuId: string;

  // Base domain for Auth
  domain?: string;

  // invitationCode
  invitationCode?: string;
}
