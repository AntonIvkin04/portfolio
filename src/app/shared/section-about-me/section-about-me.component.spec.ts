import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAboutMeComponent } from './section-about-me.component';

describe('SectionAboutMeComponent', () => {
  let component: SectionAboutMeComponent;
  let fixture: ComponentFixture<SectionAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionAboutMeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
