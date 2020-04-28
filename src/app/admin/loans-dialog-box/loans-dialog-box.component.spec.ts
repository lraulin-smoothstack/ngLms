import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansDialogBoxComponent } from './loans-dialog-box.component';

describe('LoansDialogBoxComponent', () => {
  let component: LoansDialogBoxComponent;
  let fixture: ComponentFixture<LoansDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoansDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
