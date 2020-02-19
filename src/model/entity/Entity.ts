import { Placeable } from './Placeable';
import { Direction } from '../general/Direction';
import { Coordinate } from '../general/Coordinate';

export class Entity implements Placeable {
	public neighbours: Map<Direction, Entity> = new Map<Direction, Entity>();

	constructor(public position: Coordinate) {
	}
}
