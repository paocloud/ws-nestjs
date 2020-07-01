import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HealthCheckService } from '../services/healthcheck.service';

@Controller('healthz')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}
  
  @Header('X-API-Name', 'Nest.JS')
  @Get()
  @ApiOperation({ summary: 'Responce health check message.' })
  getHealthCheck(): object {
    return this.healthCheckService.getHealthCheck();
  }
}
