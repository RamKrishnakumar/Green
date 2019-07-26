import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishviewPage } from './dishview.page';

describe('DishviewPage', () => {
  let component: DishviewPage;
  let fixture: ComponentFixture<DishviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
