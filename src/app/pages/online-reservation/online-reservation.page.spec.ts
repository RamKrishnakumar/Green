import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineReservationPage } from './online-reservation.page';

describe('OnlineReservationPage', () => {
  let component: OnlineReservationPage;
  let fixture: ComponentFixture<OnlineReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineReservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
