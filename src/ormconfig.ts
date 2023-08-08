import { DataSource } from 'typeorm';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Favorites } from './favorites/entities/favorite.entity';
import { Track } from './track/entities/track.entity';
import { User } from './user/entities/user.entity';

const myDataSource = new DataSource({
  type: 'postgres',
  host: undefined,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [User, Artist, Album, Track, Favorites],
  migrations: [__dirname + './migrations/*{.ts, .js}'],
  synchronize: true,
});

export default myDataSource;