import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ): { message: string } {
    return this.favoritesService.addTrack(trackId);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) trackId: string,
  ): { message: string } {
    return this.favoritesService.deleteTrack(trackId);
  }

  @Post('album/:id')
  addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ): { message: string } {
    return this.favoritesService.addAlbum(albumId);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) albumId: string,
  ): { message: string } {
    return this.favoritesService.deleteAlbum(albumId);
  }

  @Post('artist/:id')
  addArtistToFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ): { message: string } {
    return this.favoritesService.addArtist(artistId);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe({ version: '4' })) artistId: string,
  ): {
    message: string;
  } {
    return this.favoritesService.deleteArtist(artistId);
  }
}
