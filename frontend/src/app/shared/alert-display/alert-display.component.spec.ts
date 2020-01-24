import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDisplayComponent } from './alert-display.component';

describe('AlertDisplayComponent', () => {
  let component: AlertDisplayComponent;
  let fixture: ComponentFixture<AlertDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
