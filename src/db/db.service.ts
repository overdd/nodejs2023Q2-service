import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DbService {
  private albums: { [id: string]: Album } = {};
  private artists: { [id: string]: Artist } = {};
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  private tracks: { [id: string]: Track } = {};
  private users: { [id: string]: User } = {};
  // Album
  addNewAlbum(newAlbum: Album) {
    this.albums[newAlbum.id] = newAlbum;
  }

  findAllAlbums() {
    return Object.values(this.albums);
  }

  findOneAlbum(id: string) {
    return this.albums[id];
  }

  deleteAlbum(id: string) {
    delete this.albums[id];
  }
  // Artist
  addNewArtist(newArtist: Artist) {
    this.artists[newArtist.id] = newArtist;
  }

  findAllArtists() {
    return Object.values(this.artists);
  }

  findOneArtist(id: string) {
    return this.artists[id];
  }

  deleteArtist(id: string) {
    delete this.artists[id];
  }
  // Track
  addNewTrack(newTrack: Track) {
    this.tracks[newTrack.id] = newTrack;
  }

  findAllTracks() {
    return Object.values(this.tracks);
  }

  findOneTrack(id: string) {
    return this.tracks[id];
  }

  deleteTrack(id: string) {
    delete this.tracks[id];
  }
}
