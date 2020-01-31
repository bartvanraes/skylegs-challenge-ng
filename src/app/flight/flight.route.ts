import { FlightOverviewComponent } from './flight-overview/flight-overview.components';
import { Route } from '@angular/router';

export const flightRoutes: Array<Route> = [
    {
        path: '',
        component: FlightOverviewComponent
    }
];