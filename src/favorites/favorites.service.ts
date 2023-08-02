import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  @Inject(DbService)
  private readonly db: DbService;

  findAll() {
    return this.db.findAllFavorites();
  }

  addTrack(trackId: string): { message: string } {
    const trackExists = this.db.findOneTrack(trackId);
    if (trackExists) {
      this.db.addTrackToFavorites(trackId);
      return { message: 'Track added to favorites' };
    } else {
      throw new UnprocessableEntityException('Track does not exist');
    }
  }

  deleteTrack(trackId: string): { message: string } {
    const index = this.db.getIndexInFavs('tracks', trackId);
    if (index !== -1) {
      this.db.deleteTrackFromFavorites(index);
      return { message: 'Track deleted from favorites' };
    } else {
      throw new NotFoundException('Track not found in favorites');
    }
  }

  addAlbum(albumId: string): { message: string } {
    const albumExists = this.db.findOneAlbum(albumId);
    if (albumExists) {
      this.db.addAlbumToFavorites(albumId);
      return { message: 'Album added to favorites' };
    } else {
      throw new UnprocessableEntityException('Album does not exist');
    }
  }

  deleteAlbum(albumId: string): { message: string } {
    const index = this.db.getIndexInFavs('albums', albumId);
    if (index !== -1) {
      this.db.deleteAlbumFromFavorites(index);
      return { message: 'Album deleted from favorites' };
    } else {
      throw new NotFoundException('Album not found in favorites');
    }
  }

  addArtist(artistId: string): { message: string } {
    const artistExists = this.db.findOneArtist(artistId);
    if (artistExists) {
      this.db.addArtistToFavorites(artistId);
      return { message: 'Artist added to favorites' };
    } else {
      throw new UnprocessableEntityException('Artist does not exist');
    }
  }

  deleteArtist(artistId: string): { message: string } {
    const index = this.db.getIndexInFavs('artists', artistId);
    if (index !== -1) {
      this.db.deleteArtistFromFavorites(index);
      return { message: 'Artist deleted from favorites' };
    } else {
      throw new NotFoundException('Artist not found in favorites');
    }
  }
}
