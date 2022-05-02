import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';

const routes = [
  {
    path: 'profiles',
    children:[
      {
        path: 'priceclass',
         loadChildren: () =>
            import('./profilePriceClass/profilePriceClass.module').then((m) => m.ProfilePriceClassModule),
      },
      {
        path:'segments',
        loadChildren: () =>
            import('./profileSegments/profileSegment.module').then((m) => m.ProfileSegmentModule),
      },
      {
        path:'',
        loadChildren: () =>
            import('./profiles/profiles.module').then((m) => m.ProfilesModule),
      },
    ]
  },
   {
        path:'profilesagment',
        loadChildren: () =>
            import('./profileSegments/profileSegment.module').then((m) => m.ProfileSegmentModule),
      },
       {
        path: 'priceclass',
         loadChildren: () =>
            import('./profilePriceClass/profilePriceClass.module').then((m) => m.ProfilePriceClassModule),
      },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class CrmModule {}
