import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntropyEncodingComponent } from './entropy-encoding.component';

describe('EntropyEncodingComponent', () => {
  let component: EntropyEncodingComponent;
  let fixture: ComponentFixture<EntropyEncodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntropyEncodingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntropyEncodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
