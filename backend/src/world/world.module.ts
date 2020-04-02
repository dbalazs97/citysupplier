import { Module } from '@nestjs/common';
import { WorldGenerationService } from './world-generation/world-generation.service';
import { IslandGenerationService } from './island-generation/island-generation.service';
import { NoiseService } from './noise/noise.service';

@Module({
	providers: [WorldGenerationService, IslandGenerationService, NoiseService]
})
export class WorldModule {
}
