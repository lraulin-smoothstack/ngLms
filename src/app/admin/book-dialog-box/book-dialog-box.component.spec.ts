import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDialogBoxComponent } from './book-dialog-box.component';

describe('BookDialogBoxComponent', () => {
  let component: BookDialogBoxComponent;
  let fixture: ComponentFixture<BookDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
