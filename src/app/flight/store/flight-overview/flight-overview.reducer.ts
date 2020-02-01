import { IFlightState } from "..";
import { FlightOverviewActions, FlightAction, GetAllFlightsFail, GetAllFlightsSuccess, UpdateCurrentFlightPage, UpdateFlightPaging, SelectFlight, UpdateRadiationDoseFail, UpdateRadiationDoseSuccess } from './flight-overview.actions';

const defaultState: IFlightState = {
    selectedFlight: null,
    flights: null,
    pagedFlights: null,
    currentPage: 1,
    errorFetchingFlights: null,
    errorUpdatingRadiationDose: null,
    radiationDoseUpdateSuccess: false
};

// The mutations in the store when an action is executed
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
            return {
                ...state,
                pagedFlights: (action as UpdateFlightPaging).pagedFlights
            };
        case FlightAction.SELECT_FLIGHT: 
            return {
                ...state,
                selectedFlight: (action as SelectFlight).selectedFlight,
                radiationDoseUpdateSuccess: false
            };
        case FlightAction.UPDATE_RADIATION_DOSE: 
            return {
                ...state,
                errorUpdatingRadiationDose: null,
                radiationDoseUpdateSuccess: false
            };
        case FlightAction.UPDATE_RADIATION_DOSE_FAIL:
            return {
                ...state,
                errorUpdatingRadiationDose: (action as UpdateRadiationDoseFail).error
            };
        case FlightAction.UPDATE_RADIATION_DOSE_SUCCESS:
            // Ignore the return value of UpdateRadiationDose since the radiation dose isn't in the return data
            return {
                ...state,
                radiationDoseUpdateSuccess: (action as UpdateRadiationDoseSuccess).success
            };
        default: 
            return state;
    }
}