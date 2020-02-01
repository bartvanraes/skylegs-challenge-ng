import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { IFlight } from 'src/lib/flight';

// All the store actions for the flight module, they all have their own Action class
export enum FlightAction {
    GET_ALL_FLIGHTS = 'Get all flights',
    GET_ALL_FLIGHTS_FAIL = 'Get all flight fail',
    GET_ALL_FLIGHTS_SUCCESS = 'Get all flight success',
    UPDATE_CURRENT_FLIGHT_PAGE = 'Update current flight page',
    UPDATE_FLIGHT_PAGING = 'Update flight paging',
    UPDATE_RADIATION_DOSE = 'Update radiation dose',
    UPDATE_RADIATION_DOSE_FAIL = 'Update radiation dose fail',
    UPDATE_RADIATION_DOSE_SUCCESS = 'Update radiation dose success',
    SELECT_FLIGHT = 'Select flight'
}

export class GetAllFlights implements Action {
    type: string = FlightAction.GET_ALL_FLIGHTS;

    public constructor() {

    }
}

export class GetAllFlightsFail implements Action {
    type: string = FlightAction.GET_ALL_FLIGHTS_FAIL;

    public constructor(public error: HttpErrorResponse) {
        
    }
}

export class GetAllFlightsSuccess implements Action {
    type: string = FlightAction.GET_ALL_FLIGHTS_SUCCESS;

    public constructor(public flights: Array<IFlight>) {
    }
}

export class UpdateCurrentFlightPage implements Action {
    type: string = FlightAction.UPDATE_CURRENT_FLIGHT_PAGE;

    public constructor(public currentPage: number) {

    }
}

export class UpdateFlightPaging implements Action {
    type: string = FlightAction.UPDATE_FLIGHT_PAGING;

    public constructor(public pagedFlights: Array<IFlight>) {
    }
}

export class UpdateRadiationDose implements Action {
    type: string = FlightAction.UPDATE_RADIATION_DOSE;

    public constructor(public flight: IFlight, public radiationDose: number) {
    }
}

export class UpdateRadiationDoseFail implements Action {
    type: string = FlightAction.UPDATE_RADIATION_DOSE_FAIL;

    public constructor(public error: HttpErrorResponse) {
    }
}

export class UpdateRadiationDoseSuccess implements Action {
    type: string = FlightAction.UPDATE_RADIATION_DOSE_SUCCESS;

    public constructor(public success: boolean) {
    }
}

export class SelectFlight implements Action {
    type: string = FlightAction.SELECT_FLIGHT;

    public constructor(public selectedFlight: IFlight) {
    }
}

export type FlightOverviewActions = 
    GetAllFlights
    | GetAllFlightsFail
    | GetAllFlightsSuccess
    | UpdateCurrentFlightPage
    | UpdateFlightPaging
    | UpdateRadiationDose
    | UpdateRadiationDoseFail
    | UpdateRadiationDoseSuccess
    | SelectFlight;