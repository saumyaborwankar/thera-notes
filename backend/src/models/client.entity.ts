import { UserTier } from '@saumyaborwankar/thera-notes-api';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'user_id', type: 'uuid' }) // assigned to user
  userId: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: true })
  phoneNumber?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;
}
