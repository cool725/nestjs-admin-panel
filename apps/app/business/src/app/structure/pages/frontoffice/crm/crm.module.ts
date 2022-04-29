import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';

const routes = [
  {
    path: 'profiles',
    children:[
      {
        path:'segment',
        loadChildren: () =>
            import('./profileSegments/profileSegment.module').then((m) => m.ProfileSegmentModule),
      },
      {
        path:'',
        loadChildren: () =>
            import('./profiles/profiles.module').then((m) => m.ProfilesModule),
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class CrmModule {}
