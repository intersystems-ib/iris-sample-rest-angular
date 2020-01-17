import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLatestComponent } from './show-latest.component';

describe('ShowLatestComponent', () => {
  let component: ShowLatestComponent;
  let fixture: ComponentFixture<ShowLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
