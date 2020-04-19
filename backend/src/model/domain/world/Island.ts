import { Entity } from '../Entity';
import { IslandEntity } from '../../entity/world/IslandEntity';
import { Building } from '../building/Building';
import { ReturnModelType } from '@typegoose/typegoose';
import { BuildingEntity } from '../../entity/world/BuildingEntity';
import { TileEntity } from '../../entity/world/TileEntity';

export class Island {
	entities: Array<Entity> = [];

	toEntity(
		buildingModel: ReturnModelType<typeof BuildingEntity>,
		tileModel: ReturnModelType<typeof TileEntity>,
	): IslandEntity {
		const island = new IslandEntity();
		island.entities = this.entities.map(entity => entity.toEntity(entity instanceof Building ? buildingModel : tileModel));
		return island;
	}
}
