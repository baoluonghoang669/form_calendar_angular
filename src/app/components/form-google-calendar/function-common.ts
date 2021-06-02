import { FormGroup } from '@angular/forms';

export class FunctionCommon {

  static setRequired(event: any, checkClick: boolean, form: FormGroup, detail: string) {
    checkClick = event.target.checked;
    if (checkClick) {
      form.get(detail).setErrors({
        required: true
      });
    } else {
      form.get(detail).setErrors(null);
    }
  }
}
