import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  @Inject(DbService)
  private readonly db: DbService;

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    if (!name || !grammy) {
      throw new BadRequestException('Name, year are required fields');
    }
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
    const artist = this.db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {

    if (Object.keys(updateArtistDto).length === 0) {
      throw new BadRequestException('Invaid type of DTO');
    }
    const artist = this.db.findOneArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const { name, grammy } = updateArtistDto;

    if (!name || typeof grammy !== 'boolean') {
      throw new BadRequestException('Both name and grammy are required fields');
    }

    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  remove(id: string) {
    if (!this.db.findOneArtist(id)) {
      throw new NotFoundException('Artist not found');
    }
    this.db.deleteArtist(id);
  }
}
