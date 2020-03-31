import { Entity } from "../Entity";
import { ResourceType } from "../../global";

export interface Building extends Entity {
	inputs: Array<{ type: ResourceType, baseConsumption: number }>;
	outputs: Array<{ type: ResourceType, baseProduction: number }>;

	level: number;
	levelModifier: number;
	workforceBaseCost: number;
	moneyBaseCost: number;
}
