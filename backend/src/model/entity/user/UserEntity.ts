import { ProfileEntity } from './ProfileEntity';
import { prop } from '@typegoose/typegoose';

export class UserEntity {
	@prop({ _id: true })
	_id: string = null;

	@prop()
	name: string;

	@prop()
	email: string;

	@prop()
	passwordHash: string;

	@prop()
	profile: ProfileEntity;
}
