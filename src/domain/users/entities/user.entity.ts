import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { IUser, UserRole } from '../typing'

@Entity('users')
export class User extends BaseEntity implements IUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', nullable: false })
	role: UserRole

	@Column({ type: 'varchar', nullable: false, unique: true })
	email: string

	@Column({ nullable: false })
	name: string

	@Column({ nullable: true, type: 'integer' })
	bossId: number

	@Column({ type: 'varchar', nullable: false, select: false })
	password: string

	@Column({ type: 'varchar', nullable: false, select: false })
	passwordSalt: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	createdAt: string

	@UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
	updatedAt: string
}
