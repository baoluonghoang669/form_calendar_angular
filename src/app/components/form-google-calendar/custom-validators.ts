import { FormControl } from '@angular/forms';

export class CustomValidators {
  static invalidProjectName(control: FormControl) {
    if (control.value === 'Test') {
      return { 'invalidProjectName': true };
    }
    return null;
  }
}
