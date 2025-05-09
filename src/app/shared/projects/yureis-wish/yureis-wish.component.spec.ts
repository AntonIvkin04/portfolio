import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YureisWishComponent } from './yureis-wish.component';

describe('YureisWishComponent', () => {
  let component: YureisWishComponent;
  let fixture: ComponentFixture<YureisWishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YureisWishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YureisWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
