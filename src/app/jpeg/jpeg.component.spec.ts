import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JpegComponent } from './jpeg.component';

describe('JpegComponent', () => {
  let component: JpegComponent;
  let fixture: ComponentFixture<JpegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JpegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JpegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
