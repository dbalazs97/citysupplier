import { Coordinate, TileKind } from 'citysupplier-common';
import { prop } from '@typegoose/typegoose';

export class TileEntity {
	@prop({ _id: true })
	_id: string = null;

	@prop()
	kind: TileKind;

	@prop()
	position: Coordinate;

	@prop()
	fertility: number;

	@prop()
	buildable: boolean;
}
