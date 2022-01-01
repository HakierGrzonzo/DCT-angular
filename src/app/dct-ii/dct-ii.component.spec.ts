import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DctIIComponent } from './dct-ii.component';

describe('DctIIComponent', () => {
  let component: DctIIComponent;
  let fixture: ComponentFixture<DctIIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DctIIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DctIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
