import { WebSocket } from './src/websocket/WebSocket';
import { WebSocketReceive, WebSocketSend } from './src/websocket/WebSocketMessage';
import { Chunk } from './src/engine/map/Chunk';
import { SawMill } from './src/model/entity/buildings/SawMill';

const bootstrap = async () => {
	const socket = new WebSocket();

	socket.onMessage(WebSocketReceive.TIME_REQUEST).subscribe(payload => {
		console.log(`TIME_REQUEST message sent with payload:`, payload.second.time);
		const now: number = new Date().getTime();
		socket.sendMessage<WebSocketSend.TIME_RESPONSE>(payload.first, {
			type: WebSocketSend.TIME_RESPONSE, data: {
				time: now,
				delta: now - payload.second.time,
			},
		});
	});
	socket.listen(8001);

	const chunk = new Chunk();
	chunk.placeBuilding(0, 0, new SawMill({ x: 0, y: 0 }));
	chunk.placeBuilding(0, 1, new SawMill({ x: 0, y: 1 }));
	chunk.placeBuilding(1, 0, new SawMill({ x: 1, y: 0 }));
	chunk.placeBuilding(1, 1, new SawMill({ x: 1, y: 1 }));
};

(async () => await bootstrap())();
