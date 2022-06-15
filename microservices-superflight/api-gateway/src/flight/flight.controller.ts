import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { FlightMSG, PassengerMSG } from 'src/common/constants';
import { Flight } from 'src/common/interfaces/flight.interface';
import { ClientProxySuperFlight } from 'src/common/proxy/client.proxy';
import { FlightDTO } from './dto/flight.dto';

@ApiTags('flights')
@UseGuards(JwtAuthGuard)
@Controller('/api/v2/flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlight) {}
  private clientProxyFlight = this.clientProxy.clientProxyFlights();
  private clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() flightDTO: FlightDTO): Observable<Flight> {
    return this.clientProxyFlight.send(FlightMSG.CREATE, flightDTO);
  }

  @Get()
  findAll(): Observable<Flight[]> {
    return this.clientProxyFlight.send(FlightMSG.FIND_ALL, '');
  }
  @Get('/:id')
  findOne(@Param('id') id: string): Observable<Flight> {
    return this.clientProxyFlight.send(FlightMSG.FIND_ONE, id);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() flightDTO: FlightDTO,
  ): Observable<Flight> {
    return this.clientProxyFlight.send(FlightMSG.UPDATE, {
      id,
      flightDTO,
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientProxyFlight.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ): Promise<any> {
    const passenger = await this.clientProxyPassenger
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise();

    if (!passenger) {
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    }
    return this.clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
