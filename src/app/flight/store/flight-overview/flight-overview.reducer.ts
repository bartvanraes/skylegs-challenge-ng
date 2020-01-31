import { IFlightState } from "..";
import { FlightOverviewActions, FlightAction, GetAllFlightsFail, GetAllFlightsSuccess, UpdateCurrentFlightPage, UpdateFlightPaging, SelectFlight } from './flight-overview.actions';

const defaultState: IFlightState = {
    selectedFlight: null,
    flights: null,
    pagedFlights: null,
    currentPage: 1,
    errorFetchingFlight: null,
    errorFetchingFlights: null,
    errorUpdatingFlight: null
};

export function flightOverviewReducer(state: IFlightState = defaultState, action: FlightOverviewActions): IFlightState {
    switch(action.type) {
        case FlightAction.GET_ALL_FLIGHTS:
            return {
                ...state,
                errorFetchingFlights: null
            };
        case FlightAction.GET_ALL_FLIGHTS_FAIL:
            return {
                ...state,
                errorFetchingFlights: (action as GetAllFlightsFail).error
            };
        case FlightAction.GET_ALL_FLIGHTS_SUCCESS:
            return {
                ...state,
                flights: (action as GetAllFlightsSuccess).flights
            };
        case FlightAction.UPDATE_CURRENT_FLIGHT_PAGE:
            return {
                ...state,
                currentPage: (action as UpdateCurrentFlightPage).currentPage
            };
        case FlightAction.UPDATE_FLIGHT_PAGING:
            console.log('pagedFlights reducer');
            return {
                ...state,
                pagedFlights: (action as UpdateFlightPaging).pagedFlights
            };
        case FlightAction.SELECT_FLIGHT: 
            return {
                ...state,
                selectedFlight: (action as SelectFlight).selectedFlight
            };            
        default: 
            return state;
    }
}