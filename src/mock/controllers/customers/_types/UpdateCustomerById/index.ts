import { IsInt, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Customer } from '../_Customer'

export class UpdateCustomerByIdReqParams {
  @IsInt()
  customerId!: Customer['id']
}
export class UpdateCustomerByIdReqBody {
  @ValidateNested()
  @Type(() => Customer)
  customer!: Customer
}

export class UpdateCustomerByIdRes {}
