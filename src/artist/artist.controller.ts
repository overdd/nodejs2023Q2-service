import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  Res,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Res() response: Response, @Body() createArtistDto: CreateArtistDto) {
    const artist = this.artistService.create(createArtistDto);
    return response.status(HttpStatus.CREATED).send(artist);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const artist = this.artistService.findOne(id);
    return { statusCode: HttpStatus.OK, artist };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
