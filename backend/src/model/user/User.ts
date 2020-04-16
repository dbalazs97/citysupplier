import { Profile } from './Profile';

export interface User {
	name: string;
	email: string;
	passwordHash: string;
	profile: Profile;
}
