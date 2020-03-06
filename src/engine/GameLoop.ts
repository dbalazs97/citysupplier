// @ts-ignore
import * as Loop from 'gameloop-compatible';
import { Singleton } from '../utils/SingletonDecorator';
import * as allSettled from 'promise.allsettled';

@Singleton
export class GameLoop {
	private readonly timer: number;
	private tasks: Map<number, Promise<void>> = new Map();

	private counter: number = 0;

	constructor() {
		this.timer = Loop.setGameLoop(() => {
			allSettled([...this.tasks.values()])
				.then(() => this.tasks.clear())
				.catch(e => console.error('Game loop task error', e?.message));
		}, 1000);
	}

	public registerTask(task: Promise<void>): number {
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
