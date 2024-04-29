import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiCalculationComponent } from './emi-calculation.component';

describe('EmiCalculationComponent', () => {
  let component: EmiCalculationComponent;
  let fixture: ComponentFixture<EmiCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmiCalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmiCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
