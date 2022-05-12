import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetCompany } from '../../../../../../../../libs/api/models/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../../../libs/api/models/business/src/entities/business.entity';
import { AuthUser, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { Settings } from "../business.settings.namespace";
import {LocalesService} from "@movit/api/translation";

@Controller(Settings.resolePaths([Settings.Locales.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessSettingsLocalesController {
  constructor(protected localesService: LocalesService) {}

  @Get('all')
  getAll(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUser,
  ) {
    return this.localesService.getAllLocales()
  }

  @Put('setText')
  setText(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUser,
    @Body() params: any,
  ) {
    return this.localesService.createLocaleValue(
        params.key, (params.translation || params.value) ,params.lang, params.section
    )
  }

  @Patch('updateText')
  updateText(
      @GetCompany() business: BusinessEntity,
      @GetUser() user: AuthUser,
      @Body() params: any,
  ) {
    return this.localesService.createLocaleValue(
        params.key, (params.translation || params.value) ,params.lang, params.section
    )
  }
}
