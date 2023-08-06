import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AlbumService {
  @Inject(DbService)
  private readonly db: DbService;

  create(createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId } = createAlbumDto;
    if (!name || !year) {
      throw new BadRequestException('Name, year are required fields');
    }
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
    const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException('Artist not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.findOneAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    if (
      Object.values(updateAlbumDto).some((value) => typeof value === 'boolean')
    ) {
      throw new BadRequestException('Invaid type of DTO');
    }

    const { name, year, artistId } = updateAlbumDto;

    if (!name || !year || !artistId) {
      throw new BadRequestException(
        'Name, year and artistId are required fields',
      );
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return album;
  }

  remove(id: string) {
    if (!this.db.findOneAlbum(id)) {
      throw new NotFoundException('Album not found');
    }
    this.db.deleteAlbum(id);
  }
}
