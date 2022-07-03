import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiPageComponent } from './kanji-page.component';

describe('KanjiPageComponent', () => {
  let component: KanjiPageComponent;
  let fixture: ComponentFixture<KanjiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjiPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
