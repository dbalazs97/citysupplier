import { ResourceAmount } from 'citysupplier-common';
import { arrayProp, prop, Ref } from '@typegoose/typegoose';
import { IslandEntity } from '../world/IslandEntity';
import { BuildingEntity } from '../world/BuildingEntity';

export class ProfileEntity {
	@prop({ _id: true })
	_id: string = null;

	@prop({ ref: IslandEntity })
	island: Ref<IslandEntity>;

	@arrayProp({ items: ResourceAmount })
	resources: Array<ResourceAmount>;

	@arrayProp({ items: ResourceAmount })
	balance: Array<ResourceAmount>;

	@arrayProp({ itemsRef: BuildingEntity })
	buildings: Array<Ref<BuildingEntity>>;
}
