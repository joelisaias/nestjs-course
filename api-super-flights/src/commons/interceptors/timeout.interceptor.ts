import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, timeout } from 'rxjs';

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<any> {
    return next.handle().pipe(timeout(3000));
  }
}
