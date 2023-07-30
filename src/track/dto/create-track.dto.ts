import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  artistId: string | null;

  @IsString()
  @IsNotEmpty()
  @IsUUID(4)
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
