import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Track } from '../../track/entities/track.entity';
import { Favorites } from '../../favorites/entities/favorite.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', default: 'Album Name' })
  name: string;

  @Column({ type: 'int', default: 1 })
  year: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  artistId: string | null;

  @OneToMany(() => Track, (track: Track) => track.albumId)
  tracks: Track[];

  @OneToOne(() => Favorites, (favorites: Favorites) => favorites.album)
  favorites: Favorites;
}
