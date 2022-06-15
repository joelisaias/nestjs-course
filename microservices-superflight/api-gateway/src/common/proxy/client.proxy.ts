import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RabbitMQ } from '../constants';

@Injectable()
export class ClientProxySuperFlight {
  constructor(private readonly config: ConfigService) {}

  clientProxyGenerator(queue: string): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.config.get('AMQP_URL'),
        queue: queue,
      },
    });
  }
  clientProxyUsers(): ClientProxy {
    return this.clientProxyGenerator(RabbitMQ.UserQueue);
  }

  clientProxyPassengers(): ClientProxy {
    return this.clientProxyGenerator(RabbitMQ.PassengerQueue);
  }

  clientProxyFlights(): ClientProxy {
    return this.clientProxyGenerator(RabbitMQ.FlightQueue);
  }
}
