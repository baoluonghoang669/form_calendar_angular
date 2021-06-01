import { FormControl } from '@angular/forms';

export class CustomValidators {
  static invalidAttendees(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { 'invalidAttendees': true };
    }
    return null;
  }
}
