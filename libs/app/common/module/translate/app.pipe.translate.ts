import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './app.service.translate';

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}
  transform(value: string): string {
    return this.translateService.translate(value) || value;
  }
}
