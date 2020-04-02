import { Test, TestingModule } from '@nestjs/testing';
import { IslandGenerationService } from './island-generation.service';

describe('IslandGenerationService', () => {
	let service: IslandGenerationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [IslandGenerationService],
		}).compile();

		service = module.get<IslandGenerationService>(IslandGenerationService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
