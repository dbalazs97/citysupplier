import { Coordinate } from '../global';
import { prop } from '@typegoose/typegoose';

export class Entity {
	@prop()
	position: Coordinate;
}
