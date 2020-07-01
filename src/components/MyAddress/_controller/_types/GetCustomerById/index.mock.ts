import * as Factory from 'factory.ts'
import { CustomerMock } from '../_Customer/index.mock'
import { GetCustomerByIdReq, GetCustomerByIdRes } from '.'

export const GetCustomerByIdReqMock = Factory.Sync.makeFactory<
  GetCustomerByIdReq
>({
  customerId: CustomerMock.build().id
})

export const GetCustomerByIdResMock: Factory.Sync.Factory<GetCustomerByIdRes> = Factory.Sync.makeFactory(
  {}
).combine(CustomerMock)
