import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDialogBoxComponent } from './books-dialog-box.component';

describe('BooksDialogBoxComponent', () => {
  let component: BooksDialogBoxComponent;
  let fixture: ComponentFixture<BooksDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
