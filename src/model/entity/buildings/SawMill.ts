import { Building } from '../Building';
import { Recipe } from '../../resource/Recipe';
import { ResourceType } from '../../resource/Resource';

export class SawMill extends Building {
	public recipe: Recipe = {
		input: [{ type: ResourceType.Wood, amount: 1 }],
		output: [{ type: ResourceType.Planks, amount: 1 }],
	};
}
