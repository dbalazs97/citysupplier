import { Injectable, OnModuleInit } from '@nestjs/common';
import { configuration } from '../../config/config';
import { IslandGenerationService } from '../island-generation/island-generation.service';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { WorldEntity } from '../../model/entity/world/WorldEntity';
import { Island } from '../../model/domain/world/Island';
import { BuildingEntity } from '../../model/entity/world/BuildingEntity';
import { TileEntity } from '../../model/entity/world/TileEntity';

@Injectable()
export class WorldGenerationService implements OnModuleInit {

	constructor(
		private islandGenerationService: IslandGenerationService,
		@InjectModel(WorldEntity) private readonly worldModel: ReturnModelType<typeof WorldEntity>,
		@InjectModel(BuildingEntity) private readonly buildingModel: ReturnModelType<typeof BuildingEntity>,
		@InjectModel(TileEntity) private readonly tileModel: ReturnModelType<typeof TileEntity>,
	) {
	}

	public onModuleInit(): void {
		this.generateNewWorld().then(() => console.log('World generated'));
	}

	public async generateNewWorld(): Promise<void> {
		const islands: Array<Island> = [];

		for (let i = 0; i < configuration.WORLD_SIZE ** 2; i++) {
			islands.push(this.islandGenerationService.generateIsland(i % configuration.WORLD_SIZE, Math.floor(i / configuration.WORLD_SIZE)));
		}

		const world = new this.worldModel();
		world.islands = islands.map(island => island.toEntity(this.buildingModel, this.tileModel));
		world._id = null;
		await world.save().then(r => console.log('World saved', r)).catch(e => console.log(e));
	}

	public drawToConsole() {
		/*this.world.item.islands.forEach(islands => {
			islands.forEach(island => {
				island.entities.forEach(entities => {
					entities.forEach(entity => {
						if (entity instanceof Water) process.stdout.write(chalk.blue('█'));
						if (entity instanceof Land) process.stdout.write(entity.fertility < 0.3 ? chalk.red('█') : entity.fertility < 0.6 ? chalk.yellow('█') : chalk.green('█'));
					});
					process.stdout.write('\n');
				});
				process.stdout.write('\n');
			});
		});*/
	}
}
