import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrToTableComponent } from './arr-to-table.component';

describe('ArrToTableComponent', () => {
  let component: ArrToTableComponent;
  let fixture: ComponentFixture<ArrToTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrToTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrToTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
