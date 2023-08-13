import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrackService {
  @Inject(DbService)
  private readonly db: DbService;

  create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    if (!name || !duration) {
      throw new BadRequestException('Name and duration are required fields');
    }
    const newTrack: Track = {
      id: uuid(),
      name,
      artistId,
      albumId,
      duration,
      album: null,
      artist: null,
      favorites: null,
    };
    this.db.addNewTrack(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.findAllTracks();
  }

  findOne(id: string) {
    const track = this.db.findOneTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (Object.keys(updateTrackDto).length === 0) {
      throw new BadRequestException('Invaid type of DTO');
    }
    const track = await this.db.findOneTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const { name, duration } = updateTrackDto;

    if (!name || !duration) {
      throw new BadRequestException(
        'Name, artistId, albumId and duration are required fields',
      );
    }

    return this.db.updateTrack(track, updateTrackDto);
  }

  remove(id: string) {
    if (!this.db.findOneTrack(id)) {
      throw new NotFoundException('Track not found');
    }
    this.db.deleteTrack(id);
  }
}
