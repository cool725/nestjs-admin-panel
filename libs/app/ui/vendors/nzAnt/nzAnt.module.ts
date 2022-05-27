import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzUploadModule} from "ng-zorro-antd/upload";

@NgModule({
  declarations: [],
  imports: [],
  exports: [NzSelectModule,NzTableModule, NzUploadModule],
})
export class NzAntSharedModule {}
