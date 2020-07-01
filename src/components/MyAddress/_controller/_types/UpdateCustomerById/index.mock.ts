import * as Factory from 'factory.ts'
import { CustomerMock } from '../_Customer/index.mock'
import {
  UpdateCustomerByIdReqParams,
  UpdateCustomerByIdReqBody,
  UpdateCustomerByIdRes
} from '.'

export const UpdateCustomerByIdReqParamsMock = Factory.Sync.makeFactory<
  UpdateCustomerByIdReqParams
>({
  customerId: CustomerMock.build().id
})
export const UpdateCustomerByIdReqBodyMock = Factory.Sync.makeFactory<
  UpdateCustomerByIdReqBody
>({
  customer: CustomerMock.build()
})

export const UpdateCustomerByIdResMock = Factory.Sync.makeFactory<
  UpdateCustomerByIdRes
>({})
