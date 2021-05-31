import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGoogleCalendarComponent } from './form-google-calendar.component';

describe('FormGoogleCalendarComponent', () => {
  let component: FormGoogleCalendarComponent;
  let fixture: ComponentFixture<FormGoogleCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGoogleCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGoogleCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
