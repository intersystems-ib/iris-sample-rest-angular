import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEditDialogComponent } from './show-edit-dialog.component';

describe('ShowEditDialogComponent', () => {
  let component: ShowEditDialogComponent;
  let fixture: ComponentFixture<ShowEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
