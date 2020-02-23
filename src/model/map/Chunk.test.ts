import { Chunk, CHUNK_SIZE } from './Chunk';
import { Entity } from '../entity/Entity';

let chunk: Chunk;

beforeEach(() => {
	chunk = new Chunk();
});

describe('Generation', () => {
	it('should generate empty map', () => {
		for (let x = 0; x < CHUNK_SIZE; x++) {
			for (let y = 0; y < CHUNK_SIZE; y++) {
				expect(chunk.getAtPosition(x, y)).toBe(null);
			}
		}
	});
});

describe('getAtPosition', () => {
	it('should should return entity from given position', () => {
		const entity = new Entity({ x: 0, y: 0 });
		chunk.setAtPosition(0, 0, entity);
		expect(chunk.getAtPosition(0, 0)).toBe(entity);
	});

	it('should change entity position at placing', () => {
		const entity = new Entity({ x: 1, y: 1 });
		chunk.setAtPosition(0, 0, entity);
		expect(chunk.getAtPosition(0, 0).position.x).toBe(0);
		expect(chunk.getAtPosition(0, 0).position.y).toBe(0);
	});

	it('should throw error on negative x', () => {
		expect(() => chunk.setAtPosition(-1, 0, {} as Entity)).toThrow(RangeError);
	});

	it('should throw error on negative y', () => {
		expect(() => chunk.setAtPosition(0, -1, {} as Entity)).toThrow(RangeError);
	});

	it('should throw error on big x', () => {
		expect(() => chunk.setAtPosition(CHUNK_SIZE + 1, 0, {} as Entity)).toThrow(RangeError);
	});

	it('should throw error on big y', () => {
		expect(() => chunk.setAtPosition(0, CHUNK_SIZE + 1, {} as Entity)).toThrow(RangeError);
	});
});
