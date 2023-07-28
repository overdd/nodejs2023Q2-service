import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from 'src/interfaces/album.interface';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: { [id: string]: Album } = {};

  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    const newAlbum: Album = {
      id: uuid(),
      name,
      year,
      artistId,
    };
    this.albums[newAlbum.id] = newAlbum;
    return newAlbum;
  }

  findAll() {
    return Object.values(this.albums);
  }

  findOne(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    const album = this.albums[id];
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
    const album = this.albums[id];
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
    if (!this.albums[id]) {
      throw new NotFoundException('Album not found');
    }
    delete this.albums[id];
  }
}
