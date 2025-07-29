import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section2024Component } from './section-2024.component';

describe('Section2024Component', () => {
  let component: Section2024Component;
  let fixture: ComponentFixture<Section2024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section2024Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section2024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
