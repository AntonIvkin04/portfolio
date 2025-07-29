import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section2023Component } from './section-2023.component';

describe('Section2023Component', () => {
  let component: Section2023Component;
  let fixture: ComponentFixture<Section2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section2023Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
