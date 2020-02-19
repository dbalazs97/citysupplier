// @ts-ignore
import * as Loop from 'gameloop-compatible';
import { Singleton } from '../utils/SingletonDecorator';

@Singleton
export class GameLoop {
	private readonly timer: number;
	private tasks: Map<number, VoidFunction> = new Map();

	private counter: number = 0;

	constructor() {
		this.timer = Loop.setGameLoop(() => {
			this.tasks.forEach(task => task());
		}, 1000 / 60);
	}

	public registerTask(task: VoidFunction): number {
		this.tasks.set(++this.counter, task);
		return this.counter - 1;
	}

	public unregisterTask(id: number) {
		this.tasks.delete(id);
	}

	public destroy() {
		Loop.clearGameLoop(this.timer);
	}
}
