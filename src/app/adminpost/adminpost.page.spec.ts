import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpostPage } from './adminpost.page';

describe('AdminpostPage', () => {
  let component: AdminpostPage;
  let fixture: ComponentFixture<AdminpostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
