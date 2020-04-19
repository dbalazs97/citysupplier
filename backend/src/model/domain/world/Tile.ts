import { Entity } from '../Entity';
import { TileKind } from 'citysupplier-common';
import { ReturnModelType } from '@typegoose/typegoose';
import { TileEntity } from '../../entity/world/TileEntity';

export abstract class Tile extends Entity {
	kind: TileKind;
	buildable: boolean;
	fertility: number;

	toEntity(type: ReturnModelType<typeof TileEntity>): TileEntity {
		const tile = new type();
		tile.kind = this.kind;
		tile.buildable = this.buildable;
		tile.fertility = this.fertility;
		tile.position = this.position;
		return tile;
	}
}
