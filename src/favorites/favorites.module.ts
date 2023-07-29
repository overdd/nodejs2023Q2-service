import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [AlbumModule, ArtistModule, TrackModule],
  exports: [FavoritesService],
})
export class FavoritesModule {}
