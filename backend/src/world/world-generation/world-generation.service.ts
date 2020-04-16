import { Injectable, OnModuleInit } from '@nestjs/common';
import { World } from 'citysupplier-common/model/world';
import { configuration } from '../../config/config';
import { IslandGenerationService } from '../island-generation/island-generation.service';
import { Water } from '../../model/world/Water';
import { Land } from '../../model/world/Land';
import * as chalk from 'chalk';
import { range2D } from '../../utils/range2D';

@Injectable()
export class WorldGenerationService implements OnModuleInit {
	private world: World;

	constructor(
		private islandGenerationService: IslandGenerationService
	) {
	}

	public onModuleInit(): void {
		this.generateNewWorld();
	}

	public generateNewWorld(): void {
		this.world = { islands: [] };

		range2D(0, configuration.WORLD_SIZE,
			(x, y) => this.world.islands[x].push(this.islandGenerationService.generateIsland(x, y)),
			() => this.world.islands.push([]),
		);

		this.drawToConsole();
	}

	public drawToConsole() {
		this.world.islands.forEach(islands => {
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
		});
	}
}
