import { Module } from '@nestjs/common';
import { ClientProxySuperFlight } from './client.proxy';

@Module({
  providers: [ClientProxySuperFlight],
  exports: [ClientProxySuperFlight],
})
export class ProxyModule {}
