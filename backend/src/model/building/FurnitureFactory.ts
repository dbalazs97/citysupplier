import { Building } from 'citysupplier-common/model/entity';
import { Coordinate, ResourceType } from 'citysupplier-common/model/global';

export class FurnitureFactory implements Building {
	inputs: Array<{ type: ResourceType; baseConsumption: number }> = [{ type: ResourceType.PLANKS, baseConsumption: 1 }];
	outputs: Array<{ type: ResourceType; baseProduction: number }> = [{ type: ResourceType.FURNITURE, baseProduction: 1 }];

	level: number = 0;
	levelModifier: number = 1.06;

	moneyBaseCost: number = 3;
	workforceBaseCost: number = 3;

	constructor(public position: Coordinate) {
	}
}
