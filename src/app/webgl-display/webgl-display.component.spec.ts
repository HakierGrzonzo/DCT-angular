import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglDisplayComponent } from './webgl-display.component';

describe('WebglDisplayComponent', () => {
  let component: WebglDisplayComponent;
  let fixture: ComponentFixture<WebglDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebglDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
