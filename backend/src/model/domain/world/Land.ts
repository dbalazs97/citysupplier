import { Coordinate, TileKind } from 'citysupplier-common';
import { Tile } from './Tile';

export class Land extends Tile {
	kind = TileKind.Land;
	buildable: boolean = true;

	constructor(public position: Coordinate, public fertility: number) {
		super();
	}
}
