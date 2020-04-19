import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { WorldModule } from './world/world.module';
import { UserModule } from './user/user.module';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	imports: [
		TypegooseModule.forRoot('mongodb://localhost:27017/citysupplier', { useNewUrlParser: true, useUnifiedTopology: true }),
		WebsocketModule,
		WorldModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {
}
