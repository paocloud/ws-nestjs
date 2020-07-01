import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getHealthCheck(): object {
    return {message: "Health Check !!!"};
  }
}
