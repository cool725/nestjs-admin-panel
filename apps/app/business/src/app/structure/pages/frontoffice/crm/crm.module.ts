import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'profiles',
    children: [
      {
        path: 'priceclass',
        loadChildren: () =>
          import('./priceclass/profilePriceClass.module').then(
            (m) => m.ProfilePriceClassModule
          ),
      },
      {
        path: 'segments',
        loadChildren: () =>
          import('./segments/profileSegment.module').then(
            (m) => m.ProfileSegmentModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./profiles/profiles.module').then((m) => m.ProfilesModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class CrmModule {}
