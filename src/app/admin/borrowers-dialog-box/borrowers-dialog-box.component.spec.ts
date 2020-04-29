import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowersDialogBoxComponent } from './borrowers-dialog-box.component';

describe('BorrowersDialogBoxComponent', () => {
  let component: BorrowersDialogBoxComponent;
  let fixture: ComponentFixture<BorrowersDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowersDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowersDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
