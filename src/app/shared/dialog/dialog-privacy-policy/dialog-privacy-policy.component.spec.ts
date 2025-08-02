import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrivacyPolicyComponent } from './dialog-privacy-policy.component';

describe('DialogPrivacyPolicyComponent', () => {
  let component: DialogPrivacyPolicyComponent;
  let fixture: ComponentFixture<DialogPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPrivacyPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
