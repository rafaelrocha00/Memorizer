import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointComponentComponent } from './breakpoint-component.component';

describe('BreakpointComponentComponent', () => {
  let component: BreakpointComponentComponent;
  let fixture: ComponentFixture<BreakpointComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakpointComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
