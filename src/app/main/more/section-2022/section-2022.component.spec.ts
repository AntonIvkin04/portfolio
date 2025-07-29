import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Section2022Component } from './section-2022.component';

describe('Section2022Component', () => {
  let component: Section2022Component;
  let fixture: ComponentFixture<Section2022Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Section2022Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Section2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
