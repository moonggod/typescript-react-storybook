import Chance from 'chance'
import * as Factory from 'factory.ts'
import { Password, Email, CheckEmail } from '.'

const chance = Chance()

export const PasswordMock = Factory.Sync.makeFactory<Password>({
  currentpassword: Factory.each(() => chance.letter()),
  newpassword: Factory.each(() => chance.letter()),
  confirmnewpassword: Factory.each(() => chance.letter())
})
export const EmailMock = Factory.Sync.makeFactory<Email>({
  email: Factory.each(() => chance.email()),
  smsCode: Factory.each(() => chance.letter())
})
export const CheckEmailMock = Factory.Sync.makeFactory<CheckEmail>({
  currentemail: Factory.each(() => chance.email()),
  smsCode: Factory.each(() => chance.letter())
})
