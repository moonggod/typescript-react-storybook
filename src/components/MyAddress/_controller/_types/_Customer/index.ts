import { ValidateNested, IsInt, IsArray, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { Address } from '../_Address'

export class Customer {
  @IsInt()
  id!: number

  @IsString()
  avatar: string = ''

  @IsString()
  dob: string = ''

  @IsString()
  firstName: string = ''

  @IsString()
  lastName: string = ''

  @IsString()
  email: string = ''

  @IsInt()
  store_id: number = 123456

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Address)
  addresses: Address[] = []
}

export class CustomerId {
  @IsInt()
  customerId: number = 64
}
