import { Entity } from '../Entity';
import { prop } from '@typegoose/typegoose';

export class Tile extends Entity {
	@prop()
	buildable: boolean;

	@prop()
	fertility: number;
}
