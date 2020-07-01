import Chance from 'chance'
import * as Factory from 'factory.ts'
import { Password, BindEmailReq, ResetPasswordRes } from '.'

const chance = Chance()

export const PasswordMock = Factory.Sync.makeFactory<Password>({
  currentpassword: Factory.each(() => chance.guid()),
  newpassword: Factory.each(() => chance.guid()),
  confirmnewpassword: Factory.each(() => chance.guid())
})
export const ResetPasswordResMock = Factory.Sync.makeFactory<ResetPasswordRes>({
  data: Factory.each(() => chance.bool())
})
export const EmailMock = Factory.Sync.makeFactory<BindEmailReq>({
  email: Factory.each(() => chance.email()),
  smsCode: Factory.each(() => `${chance.integer()}`)
})
