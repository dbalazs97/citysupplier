import { Module } from '@nestjs/common';
import { WorldGenerationService } from './world-generation/world-generation.service';
import { IslandGenerationService } from './island-generation/island-generation.service';
import { NoiseService } from './noise/noise.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { WorldEntity } from '../model/entity/world/WorldEntity';
import { IslandEntity } from '../model/entity/world/IslandEntity';
import { BuildingEntity } from '../model/entity/world/BuildingEntity';
import { TileEntity } from '../model/entity/world/TileEntity';

@Module({
	imports: [
		TypegooseModule.forFeature([WorldEntity, IslandEntity, BuildingEntity, TileEntity]),
	],
	providers: [
		WorldGenerationService,
		IslandGenerationService,
		NoiseService
	]
})
export class WorldModule {
}
