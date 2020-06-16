import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsInt,
  IsBoolean
} from 'class-validator'

export class AddressWithoutId {
  @IsNotEmpty()
  @IsString()
  firstname: string = ''

  @IsNotEmpty()
  @IsString()
  lastname: string = ''

  @IsOptional()
  @IsString()
  company: string = ''

  @IsNotEmpty()
  @IsPhoneNumber('US') // TODO: US only? Should allow other countries?
  telephone: string = '' // TODO: It should be 2 - 3 parts

  @IsNotEmpty()
  @IsString()
  street: string = ''

  @IsNotEmpty()
  @IsString()
  city: string = '' // TODO: it should be an ID or code instead of any user input

  @IsInt()
  region_id: number = 0

  @IsOptional()
  @IsString()
  postcode: string = '' // TODO: is it necessary?

  @IsInt()
  country_id!: string // TODO: range (min, max)? enum?

  @IsBoolean()
  default_billing!: boolean

  @IsBoolean()
  default_shipping!: boolean
}

export class Address extends AddressWithoutId {
  @IsInt()
  id!: number
}
