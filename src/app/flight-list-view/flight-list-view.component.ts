import {AfterViewInit, Component} from '@angular/core';
import {Flight} from "../flight";
import {FlightService} from "../flight.service";
import {SelectionModel} from "@angular/cdk/collections";
import {BehaviorSubject, catchError, merge, of, startWith, switchMap, tap} from "rxjs";
import { MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-flight-list-view',
    templateUrl: './flight-list-view.component.html',
    styleUrl: './flight-list-view.component.css',
})
export class FlightListViewComponent implements AfterViewInit {
  isLoading = true;
  flightList$: BehaviorSubject<Flight[]>;
  dataSource: MatTableDataSource<Flight> = new MatTableDataSource<Flight>([]);
  selection = new SelectionModel<Flight>(false, []);
  displayedColumns: string[] = [
        'select',
        'name',
        'airline',
        'class',
        'seatNumber',
        'departureDate',
        'arrivalDate',
        'nonStop',
        'details'
    ];

  constructor(private flightService: FlightService) {
      this.flightList$ = flightService.getFlightList();
      this.flightList$.subscribe(flights => {
          this.dataSource.data = flights;
      });
  }

  ngAfterViewInit(): void {
    this.getAllFlights();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Flight): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  removeFlight(): void {
    const flight = this.selection.selected[0];

    if (flight) {
      this.flightService.deleteFlight(flight.id)
          .subscribe(() => {
            this.selection.clear();
            this.getAllFlights();
          });
    }
  }

  getAllFlights(): void {
      merge()
          .pipe(
              startWith({}),
              switchMap(() => {
                  this.isLoading = true;
                  return this.flightService.getFlights()
                      .pipe(catchError(() => of(null)));
              }),
              tap(() => {
                  // Flip flag to show that loading has finished.
                  this.isLoading = false;
              }),
          )
          .subscribe();
  }
}
