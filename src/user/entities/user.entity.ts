import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: 'Login' })
  login: string;

  @Column({ type: 'varchar', default: 'Password' })
  password: string;

  @Column({
    type: 'int',
    default: 1,
  })
  version: number;

  @Column({ type: 'timestamp', default: '1691246248143' })
  createdAt: number;

  @Column({ type: 'timestamp', default: '1691246248143' })
  updatedAt: number;

  toResponse() {
    const { id, login } = this;
    return { id, login };
  }
}
