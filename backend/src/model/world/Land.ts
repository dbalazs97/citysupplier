import { Tile } from 'citysupplier-common/model/entity';
import { Coordinate } from 'citysupplier-common/model/global';

export class Land implements Tile {
	buildable: boolean = true;

	constructor(public position: Coordinate, public fertility: number) {
	}
}
