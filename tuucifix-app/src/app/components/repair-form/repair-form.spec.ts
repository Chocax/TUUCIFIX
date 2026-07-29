import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairForm } from './repair-form';

describe('RepairForm', () => {
  let component: RepairForm;
  let fixture: ComponentFixture<RepairForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RepairForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
