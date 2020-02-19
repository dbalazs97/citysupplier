import { Building } from '../entity/Building';

export class Player {
	constructor(
		public name: string,
		public buildings: Array<Building>,
	) {
	}
}
