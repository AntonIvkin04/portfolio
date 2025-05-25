import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSidebarInfoComponent } from './dialog-sidebar-info.component';

describe('DialogSidebarInfoComponent', () => {
  let component: DialogSidebarInfoComponent;
  let fixture: ComponentFixture<DialogSidebarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSidebarInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSidebarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
