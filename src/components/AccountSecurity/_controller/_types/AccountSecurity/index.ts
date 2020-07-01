import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBoolean,
  MinLength,
  Length,
  IsInt
} from 'class-validator'
import { IsSameWith } from './IsSameWith'
export class ResetPasswordReq {
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
}
export class Password extends ResetPasswordReq {
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

export class ResetPasswordRes {
  @IsBoolean()
  data: boolean = false
}

export class sendSMSCodeReq {
  @IsInt()
  customerId?: number

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string = ''
}

export class Customer {
  @IsInt()
  customerId!: number
}
export class Email {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string = ''
}
export class SmsCode {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  smsCode: string = ''
}
export class BindEmailReq {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string = ''

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  smsCode: string = ''
}
export class SendSMSCodeRes {
  @IsBoolean()
  data: boolean = false
}

export class EmailRes {
  @IsBoolean()
  data: boolean = false
}
export class ChangeAccountReq {
  @IsNotEmpty()
  @IsString()
  firstName: string = ''

  @IsNotEmpty()
  @IsString()
  lastName: string = ''
}