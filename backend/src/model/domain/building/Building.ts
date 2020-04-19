import { BuildingKind } from 'citysupplier-common';
import { Entity } from '../Entity';
import { BuildingDescriptor, BuildingDescriptors } from './BuildingDescriptors';
import { BuildingEntity } from '../../entity/world/BuildingEntity';
import { ReturnModelType } from '@typegoose/typegoose';

export abstract class Building extends Entity {
	descriptor: BuildingDescriptor;
	level: number = 0;

	constructor(private kind: BuildingKind) {
		super();
		this.descriptor = BuildingDescriptors[kind];
	}

	toEntity(type: ReturnModelType<typeof BuildingEntity>): BuildingEntity {
		const building = new type();
		building.position = this.position;
		building.buildingKind = this.kind;
		building.descriptor = this.descriptor;
		building.level = this.level;
		return building;
	}
}
