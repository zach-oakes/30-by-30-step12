import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailViewComponent } from './flight-detail-view.component';

describe('CheckInDetailViewComponent', () => {
  let component: FlightDetailViewComponent;
  let fixture: ComponentFixture<FlightDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightDetailViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
