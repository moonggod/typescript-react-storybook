import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  Length
} from 'class-validator'
import { IsSameWith } from './IsSameWith'
export class Password {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 't(I18N._common.password.at_least_8_chars)' // TODO: FIX I18N can't show
  })
  currentpassword: string = ''

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 't(I18N._common.password.at_least_8_chars)' // TODO: FIX I18N can't show
  })
  newpassword: string = ''

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 't(I18N._common.password.at_least_8_chars)' // TODO: FIX I18N can't show
  })
  @IsSameWith('newpassword', {
    message: 't(I18N.account_security.reset_pwd.diff_password)' // TODO: FIX I18N can't show
  })
  confirmnewpassword: string = ''
}

export class Email {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string = ''

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  smsCode: string = ''
}

export class CheckEmail {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  currentemail: string = ''

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  smsCode: string = ''
}
