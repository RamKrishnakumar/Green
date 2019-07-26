import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdishPage } from './viewdish.page';

describe('ViewdishPage', () => {
  let component: ViewdishPage;
  let fixture: ComponentFixture<ViewdishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdishPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
