import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

const routes = [
  {
    path: 'profiles',
    loadChildren: () => import('./profiles/profiles.module')
      .then((m) => m.ProfilesModule),
  },
]


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CrmModule {}

