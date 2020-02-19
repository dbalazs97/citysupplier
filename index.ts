import { WebSocket } from './src/websocket/WebSocket';
import { WebSocketReceive, WebSocketSend } from './src/websocket/WebSocketMessage';

const bootstrap = async () => {
	const socket = new WebSocket();
	socket.onMessage(WebSocketReceive.TIME_REQUEST).subscribe(payload => {
		console.log(`TIME_REQUEST message sent with payload:`, payload.second.time);
		const now: number = new Date().getTime();
		socket.sendMessage<WebSocketSend.TIME_RESPONSE>(payload.first, {
			type: WebSocketSend.TIME_RESPONSE, data: {
				time: now,
				delta: now - payload.second.time,
			}
		});
	});
	socket.listen(8001);
};

(async () => await bootstrap())();
