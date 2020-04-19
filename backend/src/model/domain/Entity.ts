import { Coordinate } from 'citysupplier-common';
import { ReturnModelType } from '@typegoose/typegoose';

export abstract class Entity {
	position: Coordinate;

	public abstract toEntity(type: ReturnModelType<any>): any;
}
