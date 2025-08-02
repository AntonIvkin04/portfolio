import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDownloadInfoComponent } from './dialog-download-info.component';

describe('DialogDownloadInfoComponent', () => {
  let component: DialogDownloadInfoComponent;
  let fixture: ComponentFixture<DialogDownloadInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDownloadInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDownloadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
