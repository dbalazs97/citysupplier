import { arrayProp, prop } from '@typegoose/typegoose';
import { IslandEntity } from './IslandEntity';

export class WorldEntity {
	@prop({ _id: true })
	_id: string = null;

	@arrayProp({ items: IslandEntity })
	islands: Array<IslandEntity>;
}
