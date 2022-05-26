import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetCompany } from '../../../../../../../../../libs/api/models/company/src/company.decorator';
import { CompanyEntity } from '../../../../../../../../../libs/api/models/company/src/entities/companyEntity';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { Settings } from '../business.settings.namespace';
import { LocalesService } from '@movit/api/translation';

@Controller(Settings.resolePaths([Settings.Locales.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessSettingsLocalesController {
  constructor(protected localesService: LocalesService) {}

  @Get('all')
  getAll(@GetCompany() business: CompanyEntity, @GetUser() user: AuthUserEntity) {
    return this.localesService.getAllLocales();
  }

  @Put('setText')
  setText(
    @GetCompany() business: CompanyEntity,
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
    @GetCompany() business: CompanyEntity,
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
