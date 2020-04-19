import { Entity } from '../entity';
import { arrayProp, prop } from '@typegoose/typegoose';

export class Island {
	@prop({ ref: Entity })
	@arrayProp({ items: Entity, dim: 2 })
	entities: Array<Array<Entity>>;
}
