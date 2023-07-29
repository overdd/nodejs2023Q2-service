import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DbService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    const newAlbum: Album = {
      id: uuid(),
      name,
      year,
      artistId,
    };
    this.db.addNewAlbum(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.db.findAllAlbums();
  }

  findOne(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException('Artist not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    if (Object.keys(updateAlbumDto).length === 0) {
      throw new BadRequestException('Invaid type of DTO');
    }
    const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const { name, year, artistId } = updateAlbumDto;

    if (!name || !year || !artistId) {
      throw new BadRequestException('Both name and grammy are required fields');
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return album;
  }

  remove(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    if (!this.db.findOneAlbum(id)) {
      throw new NotFoundException('Album not found');
    }
    this.db.deleteAlbum(id);
  }
}
