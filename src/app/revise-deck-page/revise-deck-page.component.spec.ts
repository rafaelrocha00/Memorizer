import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseDeckPageComponent } from './revise-deck-page.component';

describe('ReviseDeckPageComponent', () => {
  let component: ReviseDeckPageComponent;
  let fixture: ComponentFixture<ReviseDeckPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviseDeckPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviseDeckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
