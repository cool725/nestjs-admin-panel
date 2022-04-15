import { Controller, Get } from '@nestjs/common';
import { BackOffice } from './business.backoffice.namespace';

@Controller(BackOffice.PATH)
export class BusinessBackOfficeController {
  constructor() {}

  @Get('alive')
  getData() {
    return 1;
  }
}
