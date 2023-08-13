import { DataSource } from 'typeorm';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Favorites } from './favorites/entities/favorites.entity';
import { Track } from './track/entities/track.entity';
import { User } from './user/entities/user.entity';

export const AppDataSource= new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myuser',
  password: 'mypassword',
  database: 'mydb',
  synchronize: true,
  logging: true,
  entities: [User, Artist, Album, Track, Favorites],
  subscribers: [],
  migrations: [__dirname, 'migrations/{*.ts, *.js}'],
});
