import { UserTier } from '@saumyaborwankar/thera-notes-api';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ name: 'verified', type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ name: 'tier', type: 'varchar', default: 'Free' })
  tier: UserTier;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'username', type: 'varchar' })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'hashed_rt', type: 'varchar', nullable: true })
  hashedRt: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: string;

  @Column({ name: 'verification_token', type: 'varchar' })
  verificationToken: string;

  //One to many with patient
  //One to many with note
}
