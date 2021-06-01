import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-form-google-calendar',
  templateUrl: './form-google-calendar.component.html',
  styleUrls: ['./form-google-calendar.component.css']
})
export class FormGoogleCalendarComponent implements OnInit {
  selectOptions: any = ['List Calendars', 'Create Calendar', 'Create Event'];
  selected = '';
  formGroup: FormGroup;
  listInput = [];
  listTitle = [];
  checkBox = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      input: [this.selectOptions],
      timezone: [null, Validators.maxLength(255)],
      createEvent: this.formBuilder.group({
        calendar: [null, [Validators.required, Validators.maxLength(255)]],
        startTime: [null, [Validators.required, Validators.maxLength(255)]],
        endTime: [null, [Validators.required, Validators.maxLength(255)]],
        attendees: this.formBuilder.array([this.initAttendees()]),
      }),
      commonInputs: this.formBuilder.group({
        summary: [null, [Validators.required, Validators.maxLength(255)]],
        description: [null, Validators.maxLength(255)],
        location: [null, Validators.maxLength(255)],
      }),
      infoExtract: this.formBuilder.group({
        id: [null, [Validators.maxLength(255)]],
        listSummary: [null, Validators.maxLength(255)],
        title: [null, [Validators.required, Validators.maxLength(255)]],
        eventId: [null, [Validators.required, Validators.maxLength(255)]],
        eventLink: [null, this.checkBox ? Validators.required : Validators.maxLength(255)],
      }),
    });
    this.formGroup.patchValue({
      input: this.selectOptions[0],
    });
    this.selected = 'List Calendars';
  }

  onSelectedOption(event: any) {
    const value = event.target.value;
    this.selected = value;
    this.formGroup.patchValue({
      'commonInputs': {
        'summary': null
      }
    });
  }

  // Attendees
  initAttendees() {
    return this.formBuilder.control(null, [CustomValidators.invalidAttendees.bind(this)]);
  }

  onAddAttendee() {
    const control = this.formBuilder.control(null, [CustomValidators.invalidAttendees.bind(this)]);
    (this.formGroup.get('createEvent.attendees') as FormArray).push(control);
  }

  onDeleteAttendee(id: number): void {
    (this.formGroup.get('createEvent.attendees') as FormArray).removeAt(id);
  }

  getAttendees() {
    return (this.formGroup.get('createEvent.attendees') as FormArray).controls;
  }

  checkValidateAttendees() {
    return (this.formGroup.get('createEvent.attendees') as FormArray).controls[this.getAttendees().length].errors.invalidAttendees;
  }
  // --------------- //

  // startTime - endTime
  // onCompareTime() {
  //   if ((this.formGroup.get('createEvent.startTime').value) < (this.formGroup.get('createEvent.endTime').value)) {
  //     return Validators.nullValidator;
  //   }
  //   return null;
  // }

  onChangeCheckBox(event: any) {
    this.checkBox = event.target.checked;
  }

  onClear() {
    this.selected = 'List Calendars';
    this.formGroup.reset();
    this.checkBox = false;
  }

  onSubmit() {
    console.log('Submmited', this.formGroup);
  }

}
