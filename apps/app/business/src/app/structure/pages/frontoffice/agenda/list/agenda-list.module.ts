import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaListComponent } from './agenda-list.component';
import { MdbSharedModule } from '@movit/app/ui';
import { TranslateLocaleModule } from '@movit/app/module';

@NgModule({
  declarations: [AgendaListComponent],
  imports: [CommonModule, MdbSharedModule, TranslateLocaleModule],
})
export class AgendaListModule {}
