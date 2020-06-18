import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsDate,
} from 'class-validator'
// import { IsSameWith } from './IsSameWith'
export class Notification {
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
