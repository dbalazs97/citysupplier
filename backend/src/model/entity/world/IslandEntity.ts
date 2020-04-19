import { arrayProp, prop } from '@typegoose/typegoose';
import { TileEntity } from './TileEntity';

export class IslandEntity {
	@prop({ _id: true })
	_id: string = null;

	@arrayProp({ items: TileEntity })
	entities: Array<TileEntity>;
}
