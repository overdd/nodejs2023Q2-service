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
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: 'Artist Name' })
  name: string;

  @Column({ type: 'boolean', default: false })
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];

  @OneToOne(() => Favorites, (favorites) => favorites.artist)
  favorites: Favorites;
}
