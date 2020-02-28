import { Chunk, CHUNK_SIZE } from './Chunk';
import { Entity } from '../../model/entity/Entity';
import { Direction } from '../../model/general/Direction';
import { Building } from '../../model/entity/Building';
import { Recipe } from '../../model/resource/Recipe';
import { ResourceType } from '../../model/resource/Resource';

let chunk: Chunk;
let building: Building;

beforeEach(() => {
	chunk = new Chunk();
	building = new class extends Building {
		public recipe: Recipe = {
			input: [{ type: ResourceType.Wood, amount: 1 }],
			output: [{ type: ResourceType.Planks, amount: 1 }],
		};

		constructor() {
			super({ x: 0, y: 0 });
		}
	};
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
		expect(chunk.getAtPosition(0, 0)?.position.x).toBe(0);
		expect(chunk.getAtPosition(0, 0)?.position.y).toBe(0);
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

	it('should set neighbours for 4 entities next to each other', () => {
		const entityA = new Entity({ x: 0, y: 0 });
		const entityB = new Entity({ x: 1, y: 0 });
		const entityC = new Entity({ x: 0, y: 1 });
		const entityD = new Entity({ x: 1, y: 1 });
		chunk.setAtPosition(0, 0, entityA);
		chunk.setAtPosition(1, 0, entityB);
		chunk.setAtPosition(0, 1, entityC);
		chunk.setAtPosition(1, 1, entityD);

		expect(entityA.neighbours.get(Direction.UP)).toBe(null);
		expect(entityA.neighbours.get(Direction.DOWN)).toBe(entityC);
		expect(entityA.neighbours.get(Direction.LEFT)).toBe(null);
		expect(entityA.neighbours.get(Direction.RIGHT)).toBe(entityB);

		expect(entityB.neighbours.get(Direction.UP)).toBe(null);
		expect(entityB.neighbours.get(Direction.DOWN)).toBe(entityD);
		expect(entityB.neighbours.get(Direction.LEFT)).toBe(entityA);
		expect(entityB.neighbours.get(Direction.RIGHT)).toBe(null);

		expect(entityC.neighbours.get(Direction.UP)).toBe(entityA);
		expect(entityC.neighbours.get(Direction.DOWN)).toBe(null);
		expect(entityC.neighbours.get(Direction.LEFT)).toBe(null);
		expect(entityC.neighbours.get(Direction.RIGHT)).toBe(entityD);

		expect(entityD.neighbours.get(Direction.UP)).toBe(entityB);
		expect(entityD.neighbours.get(Direction.DOWN)).toBe(null);
		expect(entityD.neighbours.get(Direction.LEFT)).toBe(entityC);
		expect(entityD.neighbours.get(Direction.RIGHT)).toBe(null);
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

describe('placeBuilding', () => {
	it('should place the building to the right place', () => {
		chunk.placeBuilding(1, 1, building);

		expect(building.position.x).toBe(1);
		expect(building.position.y).toBe(1);
		expect(chunk.getAtPosition(1, 1)).toBe(building);
	});

	it('should properly set chunk balance', () => {
		chunk.placeBuilding(1, 1, building);

		expect(chunk.getBalance(ResourceType.Wood)).toBe(-1);
		expect(chunk.getBalance(ResourceType.Planks)).toBe(1);
	});
});
