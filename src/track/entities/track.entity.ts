import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Favorites } from '../../favorites/entities/favorite.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: 'Track Name' })
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'artistId' })
  artist: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'albumId' })
  album: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  artistId: string | null;

  @Column({ type: 'varchar', nullable: true, default: null })
  albumId: string | null;

  duration: number;

  @OneToOne(() => Favorites, (favorites) => favorites.track)
  favorites: Favorites;
}
