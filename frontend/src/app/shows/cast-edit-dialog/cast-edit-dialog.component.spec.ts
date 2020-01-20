import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastEditDialogComponent } from './cast-edit-dialog.component';

describe('CastEditDialogComponent', () => {
  let component: CastEditDialogComponent;
  let fixture: ComponentFixture<CastEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
