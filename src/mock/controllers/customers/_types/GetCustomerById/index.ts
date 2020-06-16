import { IsInt } from 'class-validator'
import { Customer } from '../_Customer'

export class GetCustomerByIdReq {
  @IsInt()
  customerId!: Customer['id']
}

export class GetCustomerByIdRes extends Customer {}
