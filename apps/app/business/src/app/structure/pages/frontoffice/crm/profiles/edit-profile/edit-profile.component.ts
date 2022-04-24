import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormController } from '../../../../form.controller';
import { ProfilesAPI } from '../packages/profile-api.service';

class Profile {
  companyId:number;
  profileId:number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent extends FormController<Profile> {

  profileForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, Validators.required]
  });

  constructor(
    protected profileAPI: ProfilesAPI<Profile>,
    override injector: Injector,
    private fb: FormBuilder,
    private router: Router
  ) {
    super(injector)
  }

  getData() {
    const profileId = this.getId('id');
    if (!profileId) {
      return;
    }
    
    this.onLoadAndSetData(
      this.profileAPI.getProfile(profileId),
      this.profileAPI.profile$,
        (profile:Partial<Profile>) => {
          this.profileForm.patchValue(profile)
          return profile
      }
    )
  }

  navBack() {
    return this.router.navigateByUrl(this.basePath+'/frontoffice/crm/profiles');
  }

  doSave() {
    if (this.profileForm.invalid) {
      return;
    }

    const profileId = this.getId('id');

    const save$ = this.profileAPI.saveProfile(profileId, this.profileForm.value)

    save$
      .pipe(
       catchError(({ error }) => {
          console.log(error);
          return of(null);
        }))
      .subscribe((result) => {
        if (result) {
          this.navBack();
        }
      });
  }
}
