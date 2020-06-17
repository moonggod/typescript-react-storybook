import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsDate,
} from 'class-validator'
// import { IsSameWith } from './IsSameWith'
export class DialogMessage {
  @IsNotEmpty()
  @IsString()
  name: string = ''

  @IsNotEmpty()
  @IsString()
  @IsDate()
  time: (string | Date) = ''

  @IsNotEmpty()
  @IsString()
  avatar: string = ''

  @IsNotEmpty()
  @IsInt()
  type: number = 0

  @IsNotEmpty()
  @IsString()
  content: string = ''

  @IsInt()
  status: number = 0

  @IsOptional()
  @IsInt()
  id: number = 0
}
