import { Injectable } from '@nestjs/common';
import * as Simplex from 'simplex-noise';

@Injectable()
export class NoiseService {
	noise: any;

	constructor() {
		this.noise = new Simplex();
	}

	generate2DNoise(x: number, y: number): number {
		return this.noise.noise2D(x, y);
	}
}
