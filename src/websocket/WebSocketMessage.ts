import { WebSocketErrorMessage } from './model/send/WebSocketErrorMessage';
import { WebSocketTimeResponse } from './model/send/WebSocketTimeResponse';
import { WebSocketTimeRequest } from './model/receive/WebSocketTimeRequest';

export enum WebSocketSend {
	ERROR = 'error',
	TIME_RESPONSE = 'time-response'
}

export enum WebSocketReceive {
	ERROR = 'error',
	TIME_REQUEST = 'time-request'
}

export interface WebSocketSendData {
	[WebSocketSend.ERROR]: WebSocketErrorMessage,
	[WebSocketSend.TIME_RESPONSE]: WebSocketTimeResponse,
}

export interface WebSocketReceiveData {
	[WebSocketReceive.ERROR]: WebSocketErrorMessage,
	[WebSocketReceive.TIME_REQUEST]: WebSocketTimeRequest,
}

type DataType<T extends (WebSocketSend | WebSocketReceive)> =
	T extends WebSocketSend ? WebSocketSendData[WebSocketSend] : WebSocketReceiveData[WebSocketReceive];

export interface WebSocketMessage<T extends (WebSocketSend | WebSocketReceive)> {
	type: T;
	data: DataType<T>;
}

export const parseWebSocketMessage = (message: string): any => {
	try {
		return JSON.parse(message);
	} catch (e) {
		console.error('Can not parse message as JSON');
		return null;
	}
};

export const validateMessageBody =
	<T extends WebSocketSend | WebSocketReceive>(message: any):
		(T extends WebSocketSend ? WebSocketMessage<WebSocketSend> : WebSocketMessage<WebSocketReceive>) | null => {
		if (message === null || message === undefined) {
			console.error('Can not parse null or undefined');
			return null;
		}

		if (message.type !== undefined && message.data !== undefined) {
			if (Object.values(WebSocketSend).includes(message.type)) {
				// @ts-ignore Because WebSocketSend[message.type] is a valid type
				return message as WebSocketMessage<T[message.type]>;
			} else if (Object.values(WebSocketReceive).includes(message.type)) {
				// @ts-ignore Because WebSocketReceive[message.type] is a valid type
				return message as WebSocketMessage<WebSocketReceive[message.type]>;
			} else {
				console.error(`Message is not valid: ${ message.type } is not a valid type`);
				return null;
			}
		} else {
			console.error('Message is not valid: it has no type or payload');
			return null;
		}
	};
