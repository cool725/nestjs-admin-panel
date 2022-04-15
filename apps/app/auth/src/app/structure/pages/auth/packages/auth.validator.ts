import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordConfirm: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  if (group?.parent) {
    const control: any = group.parent?.controls;
    const pass = control['password'].value;
    const confirmPass = control['passwordConfirm'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

  return { notSame: true };
};
