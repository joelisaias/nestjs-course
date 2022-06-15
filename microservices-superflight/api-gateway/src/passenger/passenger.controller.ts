import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PassengerMSG } from 'src/common/constants';
import { Passenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlight } from 'src/common/proxy/client.proxy';
import { PassengerDTO } from './dto/passenger.dto';

@ApiTags('passengers')
@UseGuards(JwtAuthGuard)
@Controller('/api/v2/passenger')
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperFlight) {}
  private clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() passengerDTO: PassengerDTO): Observable<Passenger> {
    return this.clientProxyPassenger.send(PassengerMSG.CREATE, passengerDTO);
  }

  @Get()
  findAll(): Observable<Passenger[]> {
    return this.clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
  }
  @Get('/:id')
  findOne(@Param('id') id: string): Observable<Passenger> {
    return this.clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() passengerDTO: PassengerDTO,
  ): Observable<Passenger> {
    return this.clientProxyPassenger.send(PassengerMSG.UPDATE, {
      id,
      passengerDTO,
    });
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Observable<any> {
    return this.clientProxyPassenger.send(PassengerMSG.DELETE, id);
  }
}
