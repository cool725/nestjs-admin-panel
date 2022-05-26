import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetCompany } from '../../../../../../../../libs/api/models/company/src/company.decorator';
import { BusinessEntity } from '../../../../../../../../libs/api/models/company/src/entities/business.entity';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { Settings } from '../business.settings.namespace';
import { LocalesService } from '@movit/api/translation';

@Controller(Settings.resolePaths([Settings.Locales.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessSettingsLocalesController {
  constructor(protected localesService: LocalesService) {}

  @Get('all')
  getAll(@GetCompany() business: BusinessEntity, @GetUser() user: AuthUserEntity) {
    return this.localesService.getAllLocales();
  }

  @Put('setText')
  setText(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @Body() params: any
  ) {
    return this.localesService.createLocaleValue(
      params.key,
      decodeURI(params.translation || params.value || ''),
      params.languageId,
      params.section
    );
  }

  @Patch('updateText/:key')
  updateText(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUserEntity,
    @Param('key') key: string,
    @Body() params: any
  ) {
    return this.localesService.updateLocaleValue(
      key,
      decodeURI(params.translation || params.value || ''),
      params.languageId,
      params.section
    );
  }
}
