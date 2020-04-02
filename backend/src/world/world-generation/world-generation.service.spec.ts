import { Test, TestingModule } from '@nestjs/testing';
import { WorldGenerationService } from './world-generation.service';

describe('WorldGenerationService', () => {
	let service: WorldGenerationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [WorldGenerationService],
		}).compile();

		service = module.get<WorldGenerationService>(WorldGenerationService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
