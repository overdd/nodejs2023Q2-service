import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  private favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll() {
    const findAllFavorites = this.favorites;
    const albums = findAllFavorites.albums.map((id) =>
      this.albumService.findOne(id),
    );
    const artists = findAllFavorites.artists.map((id) =>
      this.artistService.findOne(id),
    );
    const tracks = findAllFavorites.tracks.map((id) =>
      this.trackService.findOne(id),
    );
    return { albums, artists, tracks };
  }

  addTrack(trackId: string): { message: string } {
    const trackExists = this.trackService.findOne(trackId);
    if (trackExists) {
      this.favorites.tracks.push(trackId);
      return { message: 'Track added to favorites' };
    } else {
      throw new UnprocessableEntityException('Track does not exist');
    }
  }

  deleteTrack(trackId: string): { message: string } {
    const index = this.favorites.tracks.indexOf(trackId);
    if (index !== -1) {
      this.favorites.tracks[index] = null;
      return { message: 'Track deleted from favorites' };
    } else {
      throw new NotFoundException('Track not found in favorites');
    }
  }

  addAlbum(albumId: string): { message: string } {
    const albumExists = this.albumService.findOne(albumId);
    if (albumExists) {
      this.favorites.albums.push(albumId);
      return { message: 'Album added to favorites' };
    } else {
      throw new UnprocessableEntityException('Album does not exist');
    }
  }

  deleteAlbum(albumId: string): { message: string } {
    const index = this.favorites.albums.indexOf(albumId);
    if (index !== -1) {
      this.favorites.albums[index] = null;
      return { message: 'Album deleted from favorites' };
    } else {
      throw new NotFoundException('Album not found in favorites');
    }
  }

  addArtist(artistId: string): { message: string } {
    const artistExists = this.artistService.findOne(artistId);
    if (artistExists) {
      this.favorites.artists.push(artistId);
      return { message: 'Artist added to favorites' };
    } else {
      throw new UnprocessableEntityException('Artist does not exist');
    }
  }

  deleteArtist(artistId: string): { message: string } {
    const index = this.favorites.artists.indexOf(artistId);
    if (index !== -1) {
      this.favorites.artists[index] = null;
      return { message: 'Artist deleted from favorites' };
    } else {
      throw new NotFoundException('Artist not found in favorites');
    }
  }
}
