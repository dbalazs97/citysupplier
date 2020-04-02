import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { WorldModule } from './world/world.module';

@Module({
	imports: [WebsocketModule, WorldModule],
	controllers: [],
	providers: [],
})
export class AppModule {
}
