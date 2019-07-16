import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdforgotPage } from './pwdforgot.page';

describe('PwdforgotPage', () => {
  let component: PwdforgotPage;
  let fixture: ComponentFixture<PwdforgotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwdforgotPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdforgotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
