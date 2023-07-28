import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from 'src/interfaces/artist.interface';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: { [id: string]: Artist } = {};

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;

    const newArtist: Artist = {
      id: uuid(),
      name,
      grammy,
    };

    this.artists[newArtist.id] = newArtist;
    return newArtist;
  }

  findAll() {
    return Object.values(this.artists);
  }

  findOne(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    const artist = this.artists[id];
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
    const artist = this.artists[id];
    if (!artist) {
      throw new NotFoundException('User not found');
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
    if (!this.artists[id]) {
      throw new NotFoundException('User not found');
    }
    delete this.artists[id];
  }
}
