import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Track } from '../../track/entities/track.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { EntityType } from './entity.type';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: null })
  typeId: string;

  @Column({ type: 'varchar', default: null })
  type: EntityType;

  @OneToOne(() => Track, {
    eager: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'typeId' })
  track: Track;

  @OneToOne(() => Album, {
    eager: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'typeId' })
  album: Album;

  @OneToOne(() => Artist, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'typeId' })
  artist: Artist;
}
