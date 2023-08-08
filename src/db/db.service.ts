import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { EntityType } from '../favorites/entities/entity.type'

@Injectable()
export class DbService {
  @InjectRepository(Album)
  @InjectRepository(Artist)
  @InjectRepository(Favorites)
  @InjectRepository(Track)
  @InjectRepository(User)
  private albums: Repository<Album>;
  private artists: Repository<Artist>;
  private favorites: Repository<Favorites>;
  private tracks: Repository<Track>;
  private users: Repository<User>;

  // Album
  async addNewAlbum(newAlbum: Album) {
    const album = this.albums.create(newAlbum);
    return this.albums.save(album);
  }

  async findAllAlbums() {
    return await this.albums.find();
  }

  async findOneAlbum(id: string) {
    return await this.albums.find({ where: { id } });
  }

  async updateAlbum(album: Album, updateAlbumDto: UpdateAlbumDto) {
    const albumUpdated = this.albums.merge(album, updateAlbumDto);
    return await this.albums.save(albumUpdated); 
  }

  async deleteAlbum(id: string) {
    const album =  this.albums.find({ where: { id } });
    await this.albums.delete(id);
    return album;
  }

  // Artist
  async addNewArtist(newArtist: Artist) {
    const artist = this.artists.create(newArtist);
    return this.artists.save(artist);
  }

  async findAllArtists() {
    return await this.artists.find();
  }

  async findOneArtist(id: string) {
    return await this.artists.findOne({ where: { id } });
  }

  async updateArtist(artist: Artist, updateArtistDto: UpdateArtistDto) {
    const artistUpdated = this.artists.merge(artist, updateArtistDto);
    return await this.albums.save(artistUpdated); 
  }

  async deleteArtist(id: string) {
    const artist =  this.artists.find({ where: { id } });
    await this.artists.delete(id);
    return artist;
  }

  // Track
  async addNewTrack(newTrack: Track) {
    const track = this.tracks.create(newTrack);
    return await this.tracks.save(track);
  }

  async findAllTracks() {
    return await this.tracks.find();
  }

  async findOneTrack(id: string) {
    return await this.tracks.findOne({ where: { id } });
  }

  async updateTrack(track: Track, updateTrackDto: UpdateTrackDto) {
    const tracksUpdated = this.tracks.merge(track, updateTrackDto);
    return await this.tracks.save(tracksUpdated); 
  }

  async deleteTrack(id: string) {
    return await this.tracks.delete(id);
  }

  // User
  async addNewUser(newUser: User) {
    return (await this.users.save(newUser)).toResponse();
  }

  async findAllUsers() {
    const users = await this.users.find();
    return users.map((user) => user.toResponse());
  }

  async findOneUser(id: string) {
    return await this.users.findOne({ where: { id } });
  }

  async updateUser(user: User, updateUserDto: object) {
    const userUpdated = this.users.merge(user, updateUserDto);
    return (await this.users.save(userUpdated)).toResponse(); 
  }

  async deleteUser(id: string) {
    return await this.users.delete(id);
  }

  // Favorites
  async findAllFavorites() {
    const allFavorites = await this.favorites.find();
    const favoritesByType: { [key: string]: Favorites[] } = {
      track: [],
      album: [],
      artist: [],
    };
    allFavorites.forEach((favorite) => {
      if (favorite.type === EntityType.Track) {
        favoritesByType.track.push(favorite);
      } else if (favorite.type === EntityType.Album) {
        favoritesByType.album.push(favorite);
      } else if (favorite.type === EntityType.Artist) {
        favoritesByType.artist.push(favorite);
      }
    });
    return favoritesByType;
  }

  async addTrackToFavorites(id: string) {
    const newFavorite: Favorites = new Favorites();
    newFavorite.type = EntityType.Track;
    newFavorite.typeId = id;
    return await this.favorites.save(newFavorite);
  }

  async deleteTrackFromFavorites(id: string) {
    return await this.favorites.delete(id);
  }

  async addAlbumToFavorites(id: string) {
    const newFavorite: Favorites = new Favorites();
    newFavorite.type = EntityType.Album;
    newFavorite.typeId = id;
    return await this.favorites.save(newFavorite);
  }

  async deleteAlbumFromFavorites(id: string) {
    return await this.favorites.delete(id);
  }

  async addArtistToFavorites(id: string) {
    const newFavorite: Favorites = new Favorites();
    newFavorite.type = EntityType.Artist;
    newFavorite.typeId = id;
    return await this.favorites.save(newFavorite);
  }

  async deleteArtistFromFavorites(id: string) {
    return await this.favorites.delete(id);
  }

  // General
  getIndexInFavs(table: string, id: string) {
    return this.favorites[table].indexOf(id);
  }

  setValueToNull(table: string, index: number) {
    this.favorites[table][index] = null;
  }

}
