import { Tile } from 'citysupplier-common/model/entity';
import { Coordinate } from 'citysupplier-common/model/global';

export class Water implements Tile {
	buildable: boolean = false;
	fertility: number = 0;

	constructor(public position: Coordinate) {
	}
}
