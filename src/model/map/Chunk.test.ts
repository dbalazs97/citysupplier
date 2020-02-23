import { Chunk, CHUNK_SIZE } from './Chunk';
import { Entity } from '../entity/Entity';
import { Direction } from '../general/Direction';

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

describe('setAtPosition', () => {
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

	it('should set neighbours for 1 entity', () => {
		const entity = new Entity({ x: 0, y: 0 });
		chunk.setAtPosition(0, 0, entity);
		expect(entity.neighbours.get(Direction.UP)).toBe(null);
		expect(entity.neighbours.get(Direction.DOWN)).toBe(null);
		expect(entity.neighbours.get(Direction.LEFT)).toBe(null);
		expect(entity.neighbours.get(Direction.RIGHT)).toBe(null);
	});

	it('should set neighbours for 2 entities next to each other', () => {
		const entityA = new Entity({ x: 0, y: 0 });
		const entityB = new Entity({ x: 1, y: 0 });
		chunk.setAtPosition(0, 0, entityA);
		chunk.setAtPosition(1, 0, entityB);

		expect(entityA.neighbours.get(Direction.UP)).toBe(null);
		expect(entityA.neighbours.get(Direction.DOWN)).toBe(null);
		expect(entityA.neighbours.get(Direction.LEFT)).toBe(null);
		expect(entityA.neighbours.get(Direction.RIGHT)).toBe(entityB);

		expect(entityB.neighbours.get(Direction.UP)).toBe(null);
		expect(entityB.neighbours.get(Direction.DOWN)).toBe(null);
		expect(entityB.neighbours.get(Direction.LEFT)).toBe(entityA);
		expect(entityB.neighbours.get(Direction.RIGHT)).toBe(null);
	});
});

describe('getAtPosition', () => {
	it('should return at valid position', () => {
		expect(chunk.getAtPosition(0, 0)).toBe(null);
	});

	it('should throw error on negative x', () => {
		expect(() => chunk.getAtPosition(-1, 0)).toThrow(RangeError);
	});

	it('should throw error on negative y', () => {
		expect(() => chunk.getAtPosition(0, -1)).toThrow(RangeError);
	});

	it('should throw error on big x', () => {
		expect(() => chunk.getAtPosition(CHUNK_SIZE + 1, 0)).toThrow(RangeError);
	});

	it('should throw error on big y', () => {
		expect(() => chunk.getAtPosition(0, CHUNK_SIZE + 1)).toThrow(RangeError);
	});
});
