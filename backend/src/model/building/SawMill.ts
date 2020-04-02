import { Building } from 'citysupplier-common/model/entity';
import { Coordinate, ResourceType } from 'citysupplier-common/model/global';

export class SawMill implements Building {
	inputs: Array<{ type: ResourceType; baseConsumption: number }> = [{ type: ResourceType.WOOD, baseConsumption: 1 }];
	outputs: Array<{ type: ResourceType; baseProduction: number }> = [{ type: ResourceType.PLANKS, baseProduction: 1 }];

	level: number = 0;
	levelModifier: number = 1.07;

	moneyBaseCost: number = 2;
	workforceBaseCost: number = 2;

	constructor(public position: Coordinate) {
	}
}
