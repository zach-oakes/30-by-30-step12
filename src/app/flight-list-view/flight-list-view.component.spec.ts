import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListViewComponent } from './flight-list-view.component';

describe('CheckInListViewComponent', () => {
  let component: FlightListViewComponent;
  let fixture: ComponentFixture<FlightListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightListViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
