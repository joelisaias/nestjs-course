import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxySuperFlight } from 'src/common/proxy/client.proxy';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxySuperFlight,
    private readonly jwtService: JwtService,
  ) {}

  private clientProxyUser = this.clientProxy.clientProxyUsers();

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.clientProxyUser.send(UserMSG.VALID_USER, {
      username,
      password,
    });
    return user;
  }

  async signIn(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: UserDTO) {
    return await this.clientProxyUser.send(UserMSG.CREATE, user).toPromise();
  }
}
