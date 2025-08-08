import { IsString, IsOptional, IsNotEmpty, MinLength, MaxLength, IsUrl } from 'class-validator';

export class BroadcastMessageDto {
  @IsOptional()
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  imageUrl?: string;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Body is required' })
  @MinLength(10, { message: 'Body must be at least 10 characters long' })
  @MaxLength(1000, { message: 'Body must not exceed 1000 characters' })
  body: string;
}
