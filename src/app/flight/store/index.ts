///<reference path="../../../lib/common.d.ts"/>
///<reference path="../../../lib/flight.d.ts"/>
import {Action, ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {flightOverviewReducer} from './flight-overview/flight-overview.reducer';
import {IFlight} from '../../../lib/flight';

export interface IFlightOverviewState {
    flightOverview: IFlightState;
}

export interface IFlightState {
    flights: Array<IFlight>;
    pagedFlights: Array<IFlight>;
    currentPage: number;
    errorFetchingFlights: HttpErrorResponse;
    selectedFlight: IFlight;
    errorUpdatingRadiationDose: HttpErrorResponse;
    radiationDoseUpdateCounter: number;
};

export const flightReducers: ActionReducerMap<IFlightOverviewState, Action> = {
    flightOverview: flightOverviewReducer
};

export const getFlightOverviewState = createFeatureSelector<IFlightOverviewState>('flightOverview');