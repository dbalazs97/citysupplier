import { Chunk } from './Chunk';

export const MAP_SIZE = 32;

export class GameMap {
	private readonly chunks: Array<Array<Chunk>> = [];

	constructor() {
		this.chunks = new Array(MAP_SIZE).fill(null);
		this.chunks.map(() => new Array(MAP_SIZE).fill(null));
	}

	get chunkList(): Array<Array<Chunk>> {
		return this.chunks;
	}

}
