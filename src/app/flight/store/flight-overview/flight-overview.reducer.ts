import { IFlightState } from "..";
import { FlightOverviewActions, FlightAction, GetAllFlightsFail, GetAllFlightsSuccess, UpdateCurrentFlightPage, UpdateFlightPaging, SelectFlight, UpdateRadiationDoseFail } from './flight-overview.actions';

const defaultState: IFlightState = {
    selectedFlight: null,
    flights: null,
    pagedFlights: null,
    currentPage: 1,
    //errorFetchingFlight: null,
    errorFetchingFlights: null,
    errorUpdatingRadiationDose: null,
    radiationDoseUpdateCounter: 0
    //errorUpdatingFlight: null
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
        case FlightAction.UPDATE_RADIATION_DOSE: 
            return {
                ...state,
                errorUpdatingRadiationDose: null
            };
        case FlightAction.UPDATE_RADIATION_DOSE_FAIL:
            return {
                ...state,
                errorUpdatingRadiationDose: (action as UpdateRadiationDoseFail).error
            };
        case FlightAction.UPDATE_RADIATION_DOSE_SUCCESS:
            // Ignore the return value of UpdateRadiationDose since the radiation dose isn't in the return data as far as I know
            // Keep a counter to notify the frontend that the update was successful
            return {
                ...state,
                radiationDoseUpdateCounter: state.radiationDoseUpdateCounter + 1
            };
        default: 
            return state;
    }
}