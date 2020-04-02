import { Test, TestingModule } from '@nestjs/testing';
import { NoiseService } from './noise.service';

describe('NoiseService', () => {
	let service: NoiseService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [NoiseService],
		}).compile();

		service = module.get<NoiseService>(NoiseService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
