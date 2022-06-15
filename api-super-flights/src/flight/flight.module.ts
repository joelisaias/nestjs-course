import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT } from 'src/commons/models/models';
import { PassengerModule } from 'src/passenger/passenger.module';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightSchema } from './schema/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    PassengerModule,
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
