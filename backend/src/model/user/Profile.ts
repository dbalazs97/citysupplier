import { Island } from 'citysupplier-common/model/world';
import { ResourceType } from 'citysupplier-common/model/global';
import { Building } from 'citysupplier-common/model/entity';

export interface Profile {
	island: Island;
	resources: Array<Map<ResourceType, number>>;
	buildings: Array<Building>;
}
