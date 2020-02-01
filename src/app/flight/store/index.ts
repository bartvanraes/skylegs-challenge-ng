///<reference path="../../../lib/common.d.ts"/>
///<reference path="../../../lib/flight.d.ts"/>
import {Action, ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {flightOverviewReducer} from './flight-overview/flight-overview.reducer';
import {IFlight} from '../../../lib/flight';

export interface IFlightOverviewState {
    flightOverview: IFlightState;
}

// this is all the relevant data in the store for this project
export interface IFlightState {
    flights: Array<IFlight>;                        // all the flights
    pagedFlights: Array<IFlight>;                   // the flights for the current selected page
    currentPage: number;                            // the current selected page
    errorFetchingFlights: HttpErrorResponse;        // only filled in when there is an error in the get call
    selectedFlight: IFlight;                        // filled in when the user selects a specific flight
    errorUpdatingRadiationDose: HttpErrorResponse;  // only filled in when there is an error in the post call
    radiationDoseUpdateSuccess: boolean;            // true when the radiation dose was updated successfully, reset when the user selects a different flight
};

export const flightReducers: ActionReducerMap<IFlightOverviewState, Action> = {
    flightOverview: flightOverviewReducer
};

export const getFlightOverviewState = createFeatureSelector<IFlightOverviewState>('flightOverview');