import { JsonController, Method, Body, Params } from 'routing-controllers'
import { AccountSecurityControllerSpec, ACCOUNT_SECURITY_ROUTES } from './_spec'
import {
  ResetPasswordReq,
  ResetPasswordRes,
  SendSMSCodeRes,
  BindEmailReq,
  EmailRes,
  Customer,
  Email
} from './_types'

@JsonController()
export class AccountSecurityController
  implements AccountSecurityControllerSpec {
  @Method(
    ACCOUNT_SECURITY_ROUTES.resetPassword.method,
    ACCOUNT_SECURITY_ROUTES.resetPassword.path
  )
  resetPassword(@Body() body: ResetPasswordReq): ResetPasswordRes {
    console.log(body)
    return { data: true }
  }
  @Method(
    ACCOUNT_SECURITY_ROUTES.sendSMSCode.method,
    ACCOUNT_SECURITY_ROUTES.sendSMSCode.path
  )
  sendSMSCode(@Params() params: Customer, @Body() body: Email): SendSMSCodeRes {
    console.log(params)
    console.log(body)
    return { data: true }
  }
  @Method(
    ACCOUNT_SECURITY_ROUTES.checkEmail.method,
    ACCOUNT_SECURITY_ROUTES.checkEmail.path
  )
  checkEmail(@Params() params: Customer, @Body() body: BindEmailReq): EmailRes {
    console.log(params)
    console.log(body)
    return { data: true }
  }
  @Method(
    ACCOUNT_SECURITY_ROUTES.bindEmail.method,
    ACCOUNT_SECURITY_ROUTES.bindEmail.path
  )
  bindEmail(@Params() params: Customer, @Body() body: BindEmailReq): EmailRes {
    console.log(params)
    console.log(body)
    return { data: true }
  }
}
