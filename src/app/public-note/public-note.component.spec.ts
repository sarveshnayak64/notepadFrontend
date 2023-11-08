import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNoteComponent } from './public-note.component';

describe('PublicNoteComponent', () => {
  let component: PublicNoteComponent;
  let fixture: ComponentFixture<PublicNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicNoteComponent]
    });
    fixture = TestBed.createComponent(PublicNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
