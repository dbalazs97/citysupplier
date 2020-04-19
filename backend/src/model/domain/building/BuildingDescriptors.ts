import { BuildingKind, ResourceAmount, ResourceType } from 'citysupplier-common';

export interface BuildingDescriptor {
	inputs: Array<ResourceAmount>;
	outputs: Array<ResourceAmount>;
	levelModifier: number;
	moneyBaseCost: number;
	workforceBaseCost: number;
}

export const BuildingDescriptors: { [kind in BuildingKind]: BuildingDescriptor } = {
	[BuildingKind.WoodCutter]: {
		inputs: [],
		outputs: [{ resource: ResourceType.WOOD, amount: 1 }],
		levelModifier: 1.09,
		moneyBaseCost: 1,
		workforceBaseCost: 1,
	},
	[BuildingKind.Sawmill]: {
		inputs: [{ resource: ResourceType.WOOD, amount: 1 }],
		outputs: [{ resource: ResourceType.PLANKS, amount: 1 }],
		levelModifier: 1.07,
		moneyBaseCost: 2,
		workforceBaseCost: 2,
	},
	[BuildingKind.FurnitureFactory]: {
		inputs: [{ resource: ResourceType.PLANKS, amount: 1 }],
		outputs: [{ resource: ResourceType.FURNITURE, amount: 1 }],
		levelModifier: 1.03,
		moneyBaseCost: 3,
		workforceBaseCost: 3,
	},
};
