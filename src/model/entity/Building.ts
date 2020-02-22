import { Entity } from './Entity';
import { Recipe } from '../resource/Recipe';

export abstract class Building extends Entity {
	public abstract recipe: Recipe;
}
