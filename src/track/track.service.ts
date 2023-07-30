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
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class TrackService {
  @Inject(DbService)
  private readonly db: DbService;

  create(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    const newTrack: Track = {
      id: uuid(),
      name,
      artistId,
      albumId,
      duration,
    };
    this.db.addNewTrack(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.findAllTracks();
  }

  findOne(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    const track = this.db.findOneTrack[id];
    if (!track) {
      throw new NotFoundException('Artist not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    if (Object.keys(updateTrackDto).length === 0) {
      throw new BadRequestException('Invaid type of DTO');
    }
    const track = this.db.findOneTrack[id];
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const { name, artistId, albumId, duration } = updateTrackDto;

    if (!name || !artistId || !albumId || !duration) {
      throw new BadRequestException(
        'Name, artistId, albumId and duration  are required fields',
      );
    }

    track.name = name;
    track.artistId = artistId;
    track.albumId = albumId;
    track.duration = duration;
    return track;
  }

  remove(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    if (!this.db.findOneTrack[id]) {
      throw new NotFoundException('Track not found');
    }
    this.db.deleteTrack[id];
  }
}
