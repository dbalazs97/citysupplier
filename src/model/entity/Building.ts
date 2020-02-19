import { Entity } from './Entity';
import { Resource } from '../resource/Resource';

export interface Building extends Entity {
	input: Map<Resource, number>;
	output: Map<Resource, number>;
}
