import { BuildingKind } from 'citysupplier-common';
import { TileEntity } from './TileEntity';
import { prop } from '@typegoose/typegoose';
import { BuildingDescriptor } from '../../domain/building/BuildingDescriptors';

export class BuildingEntity extends TileEntity {
	@prop()
	buildingKind: BuildingKind;

	@prop()
	descriptor: BuildingDescriptor;

	@prop()
	level: number;
}
