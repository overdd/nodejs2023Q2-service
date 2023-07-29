import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
// import { CreateFavoriteDto } from './dto/create-favorite.dto';
// import { UpdateFavoriteDto } from './dto/update-favorite.dto';
// import { Response } from 'express';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') trackId: string): { message: string } {
    return this.favoritesService.addTrack(trackId);
  }

  @Delete('track/:id')
  deleteTrackFromFavorites(@Param('id') trackId: string): { message: string } {
    return this.favoritesService.deleteTrack(trackId);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') albumId: string): { message: string } {
    return this.favoritesService.addAlbum(albumId);
  }

  @Delete('album/:id')
  deleteAlbumFromFavorites(@Param('id') albumId: string): { message: string } {
    return this.favoritesService.deleteAlbum(albumId);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') artistId: string): { message: string } {
    return this.favoritesService.addArtist(artistId);
  }

  @Delete('artist/:id')
  deleteArtistFromFavorites(@Param('id') artistId: string): {
    message: string;
  } {
    return this.favoritesService.deleteArtist(artistId);
  }
}
