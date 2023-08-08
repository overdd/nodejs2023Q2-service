import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from 'src/favorites/entities/favorite.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  providers: [DbService],
  exports: [DbService, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Album, Artist, Favorites, Track, User])]
})
export class DbModule {
  addNewAlbum: any;
  findAllAlbums: any;
  findOne: any;
  deleteAlbum: any;
}
