import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillIconsRotateComponent } from './skill-icons-rotate.component';

describe('SkillIconsRotateComponent', () => {
  let component: SkillIconsRotateComponent;
  let fixture: ComponentFixture<SkillIconsRotateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillIconsRotateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillIconsRotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
