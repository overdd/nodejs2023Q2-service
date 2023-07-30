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
    const index = this.getIndexInFavs('albums', id);
    this.deleteAlbumFromFavorites(index);
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
    const index = this.getIndexInFavs('artists', id);
    this.deleteArtistFromFavorites(index);
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
    const index = this.getIndexInFavs('tracks', id);
    this.deleteTrackFromFavorites(index);
    delete this.tracks[id];
  }

  // User
  addNewUser(newUser: User) {
    this.users[newUser.id] = newUser;
  }

  findAllUsers() {
    return Object.values(this.users);
  }

  findOneUser(id: string) {
    return this.users[id];
  }

  deleteUser(id: string) {
    delete this.users[id];
  }

  // Favorites
  findAllFavorites() {
    const albums = this.favorites.albums.map((id) => this.findOneAlbum(id));
    const artists = this.favorites.artists.map((id) => this.findOneArtist(id));
    const tracks = this.favorites.tracks.map((id) => this.findOneTrack(id));
    return { albums, artists, tracks };
  }

  addTrackToFavorites(id: string) {
    this.favorites.tracks.push(id);
  }

  deleteTrackFromFavorites(index: number) {
    this.favorites.tracks.splice(index, 1);
  }

  addAlbumToFavorites(id: string) {
    this.favorites.albums.push(id);
  }

  deleteAlbumFromFavorites(index: number) {
    this.favorites.albums.splice(index, 1);
  }

  addArtistToFavorites(id: string) {
    this.favorites.artists.push(id);
  }

  deleteArtistFromFavorites(index: number) {
    this.favorites.artists.splice(index, 1);
  }

  // General
  getIndexInFavs(table: string, id: string) {
    return this.favorites[table].indexOf(id);
  }

  setValueToNull(table: string, index: number) {
    this.favorites[table][index] = null;
  }
}
