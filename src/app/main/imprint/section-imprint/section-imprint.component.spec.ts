import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionImprintComponent } from './section-imprint.component';

describe('SectionImprintComponent', () => {
  let component: SectionImprintComponent;
  let fixture: ComponentFixture<SectionImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionImprintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
