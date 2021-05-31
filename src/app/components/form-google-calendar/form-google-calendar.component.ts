import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-google-calendar',
  templateUrl: './form-google-calendar.component.html',
  styleUrls: ['./form-google-calendar.component.css']
})
export class FormGoogleCalendarComponent implements OnInit {
  selectOptions: any = ['List Calendars', 'Create Calendar', 'Create Event'];
  selected = '';
  formSubmit: FormGroup;
  constructor() { }

  ngOnInit() {
    this.formSubmit = new FormGroup({
      'input': new FormControl(this.selectOptions),
      'timezone': new FormControl(null, Validators.maxLength(255)),
      'createEvent': new FormGroup({
        'calendarId': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
        'startTime': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
        'endTime': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
        'attendees': new FormArray([]),
      }),
      'commonInputs': new FormGroup({
        'summary': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
        'description': new FormControl(null, Validators.maxLength(255)),
        'location': new FormControl(null, Validators.maxLength(255)),
      }),
      'infoExtract': new FormGroup({
        'id': new FormControl(null, [Validators.maxLength(255)]),
        'listSummary': new FormControl(null, Validators.maxLength(255)),
        'title': new FormControl(null, [Validators.required, Validators.maxLength(255)]),
        'eventId': new FormControl(null, Validators.maxLength(255)),
        'eventLink': new FormControl(null, [Validators.maxLength(255)]),
      }),

    });
    this.formSubmit.patchValue({
      input: this.selectOptions[0]
    });
    this.selected = 'List Calendars';
  }

  onSelectedOption(event: any) {
    const value = event.target.value;
    this.selected = value;
    this.formSubmit.patchValue({
      'commonInputs': {
        'summary': null
      }
    });
  }

  onAddAttendees() {
    const control = new FormControl(null);
    (this.formSubmit.get('createEvent.attendees') as FormArray).push(control);
  }

  getAttendees() {
    return (this.formSubmit.get('createEvent.attendees') as FormArray).controls;
  }

  onClear() {
    this.formSubmit.reset();
  }

  onSubmit() {
    console.log('Submmited', this.formSubmit);
  }

}
