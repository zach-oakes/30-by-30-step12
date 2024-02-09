import {Injectable} from '@angular/core';
import {Flight} from "./flight";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FlightService {
    private url = 'https://mock-json-server-five.vercel.app/flights';
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    private flightList$: BehaviorSubject<Flight[]> = new BehaviorSubject<Flight[]>([]);
    private selectedFlight$: BehaviorSubject<Flight> = new BehaviorSubject<Flight>({} as Flight);

    constructor(private http: HttpClient) {}

    getFlightList(): BehaviorSubject<Flight[]> {
        return this.flightList$;
    }

    getSelectedFlight(): BehaviorSubject<Flight> {
        return this.selectedFlight$;
    }

    setSelectedFlight(flight: Flight): void {
        this.selectedFlight$.next(flight);
    }

    getFlights(): Observable<Flight[]> {
        return this.http.get<Flight[]>(this.url)
            .pipe(
                tap(result => this.flightList$.next(result)),
                catchError(this.handleError<Flight[]>([]))
            );
    }

    getFlight(id: string): Observable<Flight> {
        const url = `${this.url}/${id}`;

        return this.http.get<Flight>(url)
            .pipe(
                tap(flight => this.selectedFlight$.next(flight))
            );
    }

    deleteFlight(id: string): Observable<any> {
        const url = `${this.url}/${id}`;

        return this.http.delete<Flight>(url, this.httpOptions)
            .pipe(
                tap(result => {
                    // remove the deleted one from the list and update the BehaviorSubject
                    this.flightList$.next(
                        this.flightList$.value.filter(fl => fl.id !== result.id)
                    );
                }),
                catchError(this.handleError<any>('Delete failed'))
            );
    }

    updateFlight(flight: Flight): Observable<any> {
        const url = `${this.url}/${flight.id}`;

        return this.http.put<Flight>(url, flight, this.httpOptions)
            .pipe(
                tap(updated => {
                    this.flightList$.next(
                        this.flightList$.value.map(flight => {
                            // if the ids match, we want to replace the item with the updated one
                            return flight.id === updated.id ? updated : flight;
                        })
                    );
                }),
                catchError(this.handleError<any>('Update failed'))
            );
    }

    addFlight(flight: Flight): Observable<Flight> {
        return this.http.post<Flight>(this.url, flight, this.httpOptions)
            .pipe(
                tap(result => {
                    // make a copy of the array and add the new flight to it
                    this.flightList$.next([...this.flightList$.value, result]);
                    this.selectedFlight$.next({} as Flight);
                }),
                catchError(this.handleError<any>('Add failed'))
            );
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
