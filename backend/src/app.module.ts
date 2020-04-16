import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { WorldModule } from './world/world.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [WebsocketModule, WorldModule, UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {
}
