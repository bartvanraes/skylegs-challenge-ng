import { NgModule } from "@angular/core";
import { FlightOverviewComponent } from './flight-overview/flight-overview.components';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {ReactiveFormsModule} from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { flightRoutes } from './flight.route';
import { flightReducers } from './store';
import { FlightOverviewEffects } from './store/flight-overview/flight-overview.effects';
//import { LayoutModule } from '../layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';

@NgModule({
    declarations: [ 
        FlightOverviewComponent,
        FlightDetailComponent
    ],
    imports: [
        ReactiveFormsModule,
        //LayoutModule,
        CommonModule,
        RouterModule.forChild(flightRoutes),
        StoreModule.forFeature('flightOverview', flightReducers),
        EffectsModule.forFeature([
            FlightOverviewEffects
        ]),
        PaginationModule.forRoot()
    ],
    providers: [
        FlightService
    ]
})
export class FlightModule {

}