import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: 'Login' })
  login: string;

  @Column({ type: 'varchar', default: 'Password' })
  password: string;

  @Column({ type: 'int', default: 1, })
  version: number;

  @Column({ type: 'bigint', default: '1691427529' })
  createdAt: number;

  @Column({ type: 'bigint', default: '1691427529' })
  updatedAt: number;

  toResponse() {
    const { id, login } = this;
    return { id, login };
  }
}
