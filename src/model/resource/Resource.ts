export enum ResourceType {
	Fish,
	Wheat,
	Flour,
	Bread,
	Wood,
	Planks,
	Furniture,
	IronOre,
	Coal,
	Steel,
}

export interface Resource {
	type: ResourceType;
	amount: number;
}
