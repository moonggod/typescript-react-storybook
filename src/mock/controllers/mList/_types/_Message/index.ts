import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt
} from 'class-validator'
// import { IsSameWith } from './IsSameWith'
export class Message {
  @IsNotEmpty()
  @IsString()
  designer: string = ''

  @IsNotEmpty()
  @IsString()
  time: string = ''

  @IsOptional()
  @IsString()
  user: string = ''

  @IsInt()
  order: string = ''

  @IsNotEmpty()
  @IsString()
  service: string = ''

  @IsInt()
  status: number = 0

  @IsInt()
  id: number = 0
}
