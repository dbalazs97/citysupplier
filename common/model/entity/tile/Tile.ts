import { Entity } from "../Entity";

export interface Tile extends Entity {
	buildable: boolean;
	fertility: number;
}
