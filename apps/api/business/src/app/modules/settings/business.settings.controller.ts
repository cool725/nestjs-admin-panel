import { Controller, Get } from '@nestjs/common';
import { Settings } from './business.settings.namespace';

@Controller(Settings.PATH)
export class BusinessSettingsController {
  constructor() {}

  @Get('alive')
  getData() {
    return 1;
  }
}
