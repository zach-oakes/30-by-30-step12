import {Component,OnInit} from '@angular/core';
import {Flight} from "../flight";
import {DatePipe} from "@angular/common";
import {provideNativeDateAdapter} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FlightClass} from "../flight-class";
import {FlightService} from "../flight.service";
import { v4 } from 'uuid'
import {BehaviorSubject, catchError, map, merge, of, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-flight-detail-view',
  templateUrl: './flight-detail-view.component.html',
  styleUrl: './flight-detail-view.component.css',
  providers: [provideNativeDateAdapter(), DatePipe]
})
export class FlightDetailViewComponent implements OnInit {
  isLoading = true;
  selectedFlight$: BehaviorSubject<Flight>;
  flight: Flight = {} as Flight;
  invalidArrival = false;
  invalidDeparture = false;
  flightId = '';
  flightClasses: string[] = Object.values(FlightClass);

  constructor(private datePipe: DatePipe,
              private route: ActivatedRoute,
              private flightService: FlightService,
              private router: Router) {

    this.selectedFlight$ = this.flightService.getSelectedFlight();
    this.selectedFlight$.subscribe(sf => this.flight = sf);
  }

  ngOnInit(): void {
    this.flightService.setSelectedFlight({} as Flight);
    this.flightId = this.route.snapshot.paramMap.get('id')!

    // If id is not 'new' we need to look up the flight by id. Otherwise, we are creating a new flight.
     if (this.flightId !== 'new') {
       merge()
           .pipe(
               startWith({}),
               switchMap(() => {
                 this.isLoading = true;
                 return this.flightService.getFlight(this.flightId)
                     .pipe(catchError(() => of(null)));
               }),
               map(data => {
                 // Flip flag to show that loading has finished.
                 this.isLoading = false;

               }),
           )
           .subscribe();
     }

     this.isLoading = false;
  }

  get isButtonDisabled(): boolean {
    const flight = this.flight;

    return this.isEmpty(flight.airline) ||
        this.isEmpty(flight.flightClass) ||
        this.isEmpty(flight.name) ||
        this.invalidDeparture ||
        this.invalidArrival ||
        flight.seatNumber > 200;
  }

  private isEmpty(str: string): boolean {
    return str === '' || str === undefined;
  }

  onDepartureDateChange(date: string): void {
    this.invalidDeparture = false;

    const departure = new Date(date);
    const arrival = new Date(this.flight.arrivalDate);
    const transformed = this.datePipe.transform(date, 'M/d/yy');
    this.flight.departureDate = transformed ?? '';

    if (departure > arrival) {
      this.invalidDeparture = true;
    }
  }

  onArrivalDateChange(date: string): void {
    this.invalidArrival = false

    const arrival = new Date(date);
    const departure = new Date(this.flight.departureDate);
    const transformed = this.datePipe.transform(date, 'M/d/yy');
    this.flight.arrivalDate = transformed ?? '';

    if (arrival < departure) {
      this.invalidArrival = true;
    }
  }

  get departureDateStringToDate(): Date {
    if (this.flight.departureDate) {
      return new Date(this.flight.departureDate);
    }

    return new Date();
  }

  get arrivalDateStringToDate(): Date {
    if (this.flight.arrivalDate) {
      return new Date(this.flight.arrivalDate);
    }

    return new Date();
  }

  updateFlight(flight: Flight): void {
    this.flightService.updateFlight(flight)
        .subscribe(() => this.router.navigate(['/flights']));
  }

  addFlight(flight: Flight): void {
    flight.id = v4();

    if (!flight.arrivalDate) {
      flight.arrivalDate = this.datePipe.transform(new Date(), 'M/d/yy') ?? '';
    }

    if (!flight.departureDate) {
      flight.departureDate = this.datePipe.transform(new Date(), 'M/d/yy') ?? '';
    }

    this.flightService.addFlight(flight)
        .subscribe(() =>{
          this.router.navigate(['/flights'])
        });
  }
}
