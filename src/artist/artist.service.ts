import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DbService) {}

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    const newArtist: Artist = {
      id: uuid(),
      name,
      grammy,
    };

    this.db.addNewArtist(newArtist);
    return newArtist;
  }

  findAll() {
    return this.db.findAllArtists();
  }

  findOne(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    const artist = this.db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    if (Object.keys(updateArtistDto).length === 0) {
      throw new BadRequestException('Invaid type of DTO');
    }
    const artist = this.db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const { name, grammy } = updateArtistDto;

    if (!name || !grammy) {
      throw new BadRequestException('Both name and grammy are required fields');
    }

    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  remove(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    if (!this.db.findOneArtist(id)) {
      throw new NotFoundException('Artist not found');
    }
    this.db.deleteAlbum(id);
  }
}
