import {FlightClass} from "./flight-class";

export interface Flight {
    id: string,
    name: string,
    airline: string,
    seatNumber: number,
    departureDate: string,
    arrivalDate: string,
    flightClass: FlightClass,
    nonStop: boolean,
}