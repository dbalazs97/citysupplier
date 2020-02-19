import { Entity } from '../entity/Entity';
import { Direction } from '../general/Direction';

export const CHUNK_SIZE = 16;

export class Chunk {
	private readonly entities: Array<Array<Entity>> = [];

	constructor() {
		this.entities = new Array(CHUNK_SIZE).fill(null);
		this.entities.map(() => new Array(CHUNK_SIZE).fill(null));
	}

	public getAtPosition(x: number, y: number): Entity {
		if (x >= 0 && y >= 0 && x < CHUNK_SIZE && y < CHUNK_SIZE) {
			return this.entities[x][y];
		} else {
			throw new RangeError(`Can not get entity outside of chunk boundary (${ x }, ${ y })`);
		}
	}

	public setAtPosition(x: number, y: number, entity: Entity): void {
		if (x >= 0 && y >= 0 && x < CHUNK_SIZE && y < CHUNK_SIZE) {
			entity.neighbours.set(Direction.UP, this.entities[x][y - 1]);
			entity.neighbours.set(Direction.DOWN, this.entities[x][y + 1]);
			entity.neighbours.set(Direction.LEFT, this.entities[x - 1][y]);
			entity.neighbours.set(Direction.RIGHT, this.entities[x + 1][y]);
			this.entities[x][y] = entity;
		} else {
			throw new RangeError(`Can not set entity outside of chunk boundary (${ x }, ${ y })`);
		}
	}
}
