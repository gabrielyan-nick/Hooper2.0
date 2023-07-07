import { Controller, Get } from '@nestjs/common';
import { MarkerService } from './marker.service';

@Controller('markers')
export class MarkerController {
  constructor(private readonly markerService: MarkerService) {}

  @Get()
  async getAllMarkers() {
    return this.markerService.getAllMarkers();
  }
}
