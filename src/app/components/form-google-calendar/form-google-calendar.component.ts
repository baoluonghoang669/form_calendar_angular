import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { FunctionCommon } from './function-common';

@Component({
  selector: 'app-form-google-calendar',
  templateUrl: './form-google-calendar.component.html',
  styleUrls: ['./form-google-calendar.component.css']
})
export class FormGoogleCalendarComponent implements OnInit {
  selectOptions: any = ['List Calendars', 'Create Calendar', 'Create Event'];
  selected = '';
  formGroup: FormGroup;
  isSubmitted = false;
  isClick = false;
  isIdClick = false;
  isSumClick = false;
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
        eventLink: [null, Validators.maxLength(255)],
        checkEventLink: [this.isClick, Validators.maxLength(255)]
      }),
    });
    this.formGroup.patchValue({
      input: this.selectOptions[0],
    });
    this.selected = 'List Calendars';
  }

  onSelectedOption(event: any) {
    this.selected = event.target.value;
    this.isSubmitted = false;
    this.formGroup.patchValue({
      'commonInputs': {
        'summary': null,
        'description': null,
        'location': null,
      }
    });
  }

  // Attendees
  initAttendees() {
    return this.formBuilder.control(null, [Validators.maxLength(255), CustomValidators.invalidAttendees.bind(this)]);
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
  endTime() {
    return this.formGroup.get('createEvent.endTime').value;
  }
  startTime() {
    return this.formGroup.get('createEvent.startTime').value;
  }

  onChangeCheckBox(event: any) {
    FunctionCommon.setRequired(event, this.isClick, this.formGroup, 'infoExtract.eventLink');
  }

  onChangeId(event: any) {
    FunctionCommon.setRequired(event, this.isIdClick, this.formGroup, 'infoExtract.id');
  }

  onChangeSum(event: any) {
    FunctionCommon.setRequired(event, this.isSumClick, this.formGroup, 'infoExtract.listSummary');
  }

  get dataSubmit() {
    return {
      action: this.formGroup.get('input').value,
      list_title: this.list_title(),
      list_input: this.list_input()
    };
  }

  array_list_input() {
    if (this.selected === 'List Calendars') {
      return [];
    } else if (this.selected === 'Create Calendar' || this.selected === 'Create Event') {
      return [
        { title: 'summary' },
        { title: 'description' },
        { title: 'location' },
      ];
    } else if (this.selected === 'Create Event') {
      return [
        { title: 'calendar' },
        { title: 'endTime' },
        { title: 'startTime' },
        { title: 'attendees' },
      ];
    }
  }
  array_list_title() {
    if (this.selected === 'List Calendars') {
      return [
        { title: 'id', click: this.isIdClick },
        { title: 'listSummary', click: this.isSumClick }
      ];
    } else if (this.selected === 'Create Calendar') {
      return [
        { title: 'title' },
      ];
    } else {
      return [
        // { title: 'eventId' },
        { title: 'eventLink' },
      ];
    }
  }
  list_input() {
    if (this.selected === 'List Calendars') {
      return null;
    } else if (this.selected === 'Create Calendar') {
      return {
        summary: this.formGroup.get('commonInputs.summary').value || null,
        description: this.formGroup.get('commonInputs.description').value || null,
        location: this.formGroup.get('commonInputs.location').value || null,
        timezone: this.formGroup.get('timezone').value || null,
      };
    } else {
      return {
        summary: this.formGroup.get('commonInputs.summary').value || null,
        description: this.formGroup.get('commonInputs.description').value || null,
        location: this.formGroup.get('commonInputs.location').value || null,
        calendar: this.formGroup.get('createEvent.calendar').value || null,
        startTime: this.formGroup.get('createEvent.startTime').value || null,
        endTime: this.formGroup.get('createEvent.endTime').value || null,
        attendees: this.formGroup.get('createEvent.attendees').value || [],
      };
    }
  }

  list_title() {
    if (this.selected === 'List Calendars') {
      return {
        id: this.formGroup.get('infoExtract.id').value || null,
        listSummary: this.formGroup.get('infoExtract.listSummary').value || null,
      };
    } else if (this.selected === 'Create Calendar') {
      return {
        title: this.formGroup.get('infoExtract.title').value || null,
      };
    } else {
      return {
        eventLink: this.formGroup.get('infoExtract.eventId').value || null,
        eventId: this.formGroup.get('infoExtract.eventLink').value || null,
      };
    }
  }

  onClear() {
    this.selected = 'List Calendars';
    this.formGroup.reset();
    this.isSubmitted = false;
    this.isClick = false;
    this.isIdClick = false;
    this.isSumClick = false;
    this.formGroup.enable();
  }

  checkProperties(obj: any) {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] !== '') {
        return false;
      }
    }
    return true;
  }

  onEdit() {
    this.isSubmitted = false;
    this.formGroup.enable();
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.isSubmitted) {
      this.formGroup.disable();
    }
    if (this.selected === 'Create Event' || this.selected === 'Create Calendar') {
      // check at least 1 field input isNull
      if (this.checkProperties(this.dataSubmit.list_title) && this.checkProperties(this.list_input)) {
        this.formGroup.enable();
        alert('Form is invalid');
        return null;
      }
      alert('Form is submitted');
      console.log(this.dataSubmit);
    }
  }
}
