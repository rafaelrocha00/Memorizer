import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeckPageComponent } from './manage-deck-page.component';

describe('ManageDeckPageComponent', () => {
  let component: ManageDeckPageComponent;
  let fixture: ComponentFixture<ManageDeckPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDeckPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
