import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMenuPage } from './location-menu.page';

describe('LocationMenuPage', () => {
  let component: LocationMenuPage;
  let fixture: ComponentFixture<LocationMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
