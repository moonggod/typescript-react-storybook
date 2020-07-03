import {
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsDate,
} from 'class-validator'
import { Type } from 'class-transformer'

export class Log {
  @IsNotEmpty()
  @IsString()
  designer: string = ''

  @IsNotEmpty()
  @IsString()
  @IsDate()
  time: (string | Date) = ''

  @IsOptional()
  @IsString()
  user: string = ''

  @IsInt()
  order: number = 200000

  @IsNotEmpty()
  @IsString()
  service: string = ''

  @IsNotEmpty()
  @IsString()
  content: string = ''

  @IsInt()
  status: number = 0

  @IsInt()
  id: number = 0
}

export class Customer {
  @IsInt()
  customerId!: number
}

export class GetLogListParams extends Customer {
}

export class GetLogListQuery {
  @IsNotEmpty()
  @IsInt()
  page: number = 1
}

export class GetLogListRes {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Log)
  list: Log[] = []
}