import { IsString, IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsUUID(4)
  @IsNotEmpty()
  artistId: string | null;
}
