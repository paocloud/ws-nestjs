import { Module } from '@nestjs/common';
import { HealthCheckController } from '../controllers/healthcheck.controller';
import { HealthCheckService } from '../services/healthcheck.service';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
  exports: [HealthCheckService],
})
export class HealthCheckModule { }