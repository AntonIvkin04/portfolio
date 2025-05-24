import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillIconsMarqueeComponent } from './skill-icons-marquee.component';

describe('SkillIconsMarqueeComponent', () => {
  let component: SkillIconsMarqueeComponent;
  let fixture: ComponentFixture<SkillIconsMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillIconsMarqueeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillIconsMarqueeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
