import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FlightAction, GetAllFlights, GetAllFlightsSuccess, GetAllFlightsFail, UpdateFlightPaging, UpdateCurrentFlightPage, UpdateRadiationDose, UpdateRadiationDoseSuccess, UpdateRadiationDoseFail } from './flight-overview.actions';
import { FlightService } from 'src/app/services/flight.service';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { IFlight } from 'src/lib/flight';
import { IFlightOverviewState } from '..';

const ITEMS_PER_PAGE: number = 10;

// The effects that trigger after certain store actions are dispatched
// the service calls are executed here as a response to store actions
@Injectable()
export class FlightOverviewEffects {
    public constructor(private actions$: Actions, private store$: Store<any>, private flightService: FlightService) {
    }

    // When the 'GetAllFlights' action is triggered the api is called and the data is passed through a 'GetAllFlightsSuccess' action (unless there is an error)
    // Flights are sorted by takeoff time
    @Effect()
    getAllFlights: Observable<Action> = this.actions$.pipe(
        ofType(FlightAction.GET_ALL_FLIGHTS),
        switchMap((action: GetAllFlights) => this.flightService.getAllFlights()),
        map((res: Array<IFlight>) => new GetAllFlightsSuccess(res.sort((a, b) => new Date(b.tot).getTime() - new Date(a.tot).getTime()))),
        catchError(err => of(new GetAllFlightsFail(err)))
    );

    // Reset the paging when the flight data is refreshed
    @Effect()
    getAllFlightsSuccess: Observable<Action> = this.actions$.pipe(
        ofType(FlightAction.GET_ALL_FLIGHTS_SUCCESS),
        map((action: GetAllFlightsSuccess) => new UpdateCurrentFlightPage(1))
    );

    // Filter the flights for the current page when the paging is triggered
    @Effect()
    updateCurrentFlightPage: Observable<Action> = this.actions$.pipe(
        ofType(FlightAction.UPDATE_CURRENT_FLIGHT_PAGE),
        withLatestFrom(this.store$),
        map(([action, storeState]) => {
            const currentPage = (action as UpdateCurrentFlightPage).currentPage;
            const start = (currentPage - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            const flightOverviewState = storeState.flightOverview as IFlightOverviewState;
            if (flightOverviewState.flightOverview.flights) {
                return new UpdateFlightPaging(flightOverviewState.flightOverview.flights.slice(start, end)); 
            } else {
                return new UpdateFlightPaging([]);
            }
        })
    );

    // Triggers the post api call
    @Effect()
    updateRadiationDose: Observable<Action> = this.actions$.pipe(
        ofType(FlightAction.UPDATE_RADIATION_DOSE),
        switchMap((action: UpdateRadiationDose) => this.flightService.updateCosmicRadiation(action.flight, action.radiationDose)),
        map((res: IFlight) => {
            return new UpdateRadiationDoseSuccess(res !== null && res.mission_id !== null)
        }),
        catchError(err => of(new UpdateRadiationDoseFail(err)))
    );
}