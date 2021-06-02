import { FormControl } from '@angular/forms';

export class CustomValidators {
  static invalidAttendees(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test@gmail.com') {
      return { 'invalidAttendees': true };
    }
    return null;
  }
}
