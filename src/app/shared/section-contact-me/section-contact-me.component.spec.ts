import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionContactMeComponent } from './section-contact-me.component';

describe('SectionContactMeComponent', () => {
  let component: SectionContactMeComponent;
  let fixture: ComponentFixture<SectionContactMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionContactMeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionContactMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
