import { ValidateNested, IsInt, IsArray } from 'class-validator'
import { Type } from 'class-transformer'
import { Address } from '../_Address'

export class Customer {
  @IsInt()
  id!: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Address)
  addresses: Address[] = []
}
