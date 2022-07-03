import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BInputComponent } from './b-input.component';

describe('BInputComponent', () => {
  let component: BInputComponent;
  let fixture: ComponentFixture<BInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
