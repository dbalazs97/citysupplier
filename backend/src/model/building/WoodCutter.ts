import { Building } from 'citysupplier-common/model/entity';
import { Coordinate, ResourceType } from 'citysupplier-common/model/global';

export class WoodCutter implements Building {
	inputs: Array<{ type: ResourceType; baseConsumption: number }> = [];
	outputs: Array<{ type: ResourceType; baseProduction: number }> = [{ type: ResourceType.WOOD, baseProduction: 1 }];

	level: number = 0;
	levelModifier: number = 1.09;

	moneyBaseCost: number = 1;
	workforceBaseCost: number = 1;

	constructor(public position: Coordinate) {
	}
}
