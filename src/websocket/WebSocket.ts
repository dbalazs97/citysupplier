import { Connection, createServer, Server } from 'sockjs';
import { parseWebSocketMessage, validateMessageBody, WebSocketMessage, WebSocketReceive, WebSocketReceiveData, WebSocketSend } from './WebSocketMessage';
import { Observable, Subject } from 'rxjs';
import { Pair } from '../utils/Pair';
import { filter, map } from 'rxjs/operators';
import * as http from 'http';
import { Singleton } from '../utils/SingletonDecorator';

@Singleton
export class WebSocket {
	private server: Server;
	private connections: Array<Connection> = [];

	private onConnectSubject: Subject<Connection> = new Subject();
	private onDisconnectSubject: Subject<Connection> = new Subject();
	private onMessageSubject: Subject<Pair<Connection, string>> = new Subject();

	constructor() {
		this.server = createServer({});
		this.server.on('connection', conn => {
			conn.on('close', () => {
				this.onDisconnectSubject.next(conn);
				this.connections = this.connections.filter(c => c.id !== conn.id);
			});

			conn.on('data', message => {
				this.onMessageSubject.next({ first: conn, second: message });
			});

			this.connections.push(conn);
			this.onConnectSubject.next(conn);
		});
	}

	public get onConnect(): Observable<Connection> {
		return this.onConnectSubject.asObservable();
	}

	public get onDisconnect(): Observable<Connection> {
		return this.onDisconnectSubject.asObservable();
	}

	public listen(port: number) {
		const httpServer = http.createServer();
		this.server.installHandlers(httpServer);
		httpServer.listen(port);
	}

	public onMessage<T extends WebSocketReceive>(type: T): Observable<Pair<Connection, WebSocketReceiveData[T]>> {
		return this.onMessageSubject.asObservable().pipe(
			map(msg => ({ first: msg.first, second: validateMessageBody<WebSocketReceive>(parseWebSocketMessage(msg.second)) })),
			filter(msg => msg.second !== null),
			filter(msg => msg.second!.type === type),
			map(msg => ({ first: msg.first, second: msg.second!.data as WebSocketReceiveData[T] })),
		);
	}

	public sendMessage<T extends WebSocketSend>(client: Connection, message: WebSocketMessage<T>) {
		const connection: Connection | undefined = this.connections.find(c => c.id === client.id);
		if (connection !== undefined) {
			connection.write(JSON.stringify(validateMessageBody<WebSocketSend>(message)), err => {
				throw new Error(`Can not send message: ${ err?.message }`);
			});
		} else {
			throw new TypeError('Client not exists');
		}
	}
}
