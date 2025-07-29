import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section2025Component } from './section-2025.component';

describe('Section2025Component', () => {
  let component: Section2025Component;
  let fixture: ComponentFixture<Section2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section2025Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
