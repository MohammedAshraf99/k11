import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponModelComponent } from './coupon-model.component';

describe('CouponModelComponent', () => {
  let component: CouponModelComponent;
  let fixture: ComponentFixture<CouponModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
