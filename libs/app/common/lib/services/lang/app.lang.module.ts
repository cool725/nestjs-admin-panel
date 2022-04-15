import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { LangService } from './app.lang.service';

@Pipe({ name: 'translate' })
export class TranslatePipeTransform implements PipeTransform {
  constructor(protected lang: LangService) {}

  transform(key: any, section = 'page', args?: any): any {
    if (!key) return key || '';
    return this.lang.translate(key, section, args, key);
  }
}

@NgModule({
  declarations: [TranslatePipeTransform],
  exports: [TranslatePipeTransform],
  providers: [],
})
export class TranslatePipeModule {}
