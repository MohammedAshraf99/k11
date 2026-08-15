import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyButtonComponent } from './qty-button.component';

describe('QtyButtonComponent', () => {
  let component: QtyButtonComponent;
  let fixture: ComponentFixture<QtyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QtyButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
