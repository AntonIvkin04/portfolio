import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillFadeComponent } from './skill-fade.component';

describe('SkillFadeComponent', () => {
  let component: SkillFadeComponent;
  let fixture: ComponentFixture<SkillFadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillFadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillFadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
