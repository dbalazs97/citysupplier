import { Coordinate, TileKind } from 'citysupplier-common';
import { Tile } from './Tile';

export class Water extends Tile {
	kind = TileKind.Water;
	buildable: boolean = false;
	fertility: number = 0;

	constructor(public position: Coordinate) {
		super();
	}
}
