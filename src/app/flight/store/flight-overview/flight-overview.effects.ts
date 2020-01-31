import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom, filter} from 'rxjs/operators';
import { FlightAction, GetAllFlights, GetAllFlightsSuccess, GetAllFlightsFail, UpdateFlightPaging, UpdateCurrentFlightPage } from './flight-overview.actions';
import { FlightService } from 'src/app/services/flight.service';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import { IFlight } from 'src/lib/flight';
import { IFlightState, IFlightOverviewState } from '..';
import { IAppState } from 'src/app/store';

@Injectable()
export class FlightOverviewEffects {
    @Effect()
    getAllFlights: Observable<Action> = this.actions$.pipe(
        ofType(FlightAction.GET_ALL_FLIGHTS),
        switchMap((action: GetAllFlights) => this.flightService.getAllFlights()),
        map((res: Array<IFlight>) => {
            return new GetAllFlightsSuccess(res.sort((a, b) => new Date(b.tot).getTime() - new Date(a.tot).getTime()));
        }),
        catchError(err => of(new GetAllFlightsFail(err)))
    );

    public constructor(private actions$: Actions, private store$: Store<any>, private flightService: FlightService) {
    }

    @Effect()
    getAllFlightsSuccess: Observable<Action> = this.actions$.pipe(
        ofType(FlightAction.GET_ALL_FLIGHTS_SUCCESS),
        map((action: GetAllFlightsSuccess) => new UpdateCurrentFlightPage(1))
    );

    @Effect()
    updateCurrentFlightPage: Observable<Action> = this.actions$.pipe(
        ofType(FlightAction.UPDATE_CURRENT_FLIGHT_PAGE),
        withLatestFrom(this.store$),
        map(([action, storeState]) => {
            console.log('updateCurrentFlightPage');
            const currentPage = (action as UpdateCurrentFlightPage).currentPage;
            const start = (currentPage - 1) * 10;
            const end = start + 10;
            const flightOverviewState = storeState.flightOverview as IFlightOverviewState;
            if (flightOverviewState.flightOverview.flights) {
                return new UpdateFlightPaging(flightOverviewState.flightOverview.flights.slice(start, end)); 
            } else {
                return new UpdateFlightPaging([]);
            }

        })
    )
}

