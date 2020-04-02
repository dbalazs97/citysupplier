import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ port: '8081' })
export class WebsocketGateway {
}
