import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishslistPage } from './dishslist.page';

describe('DishslistPage', () => {
  let component: DishslistPage;
  let fixture: ComponentFixture<DishslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
