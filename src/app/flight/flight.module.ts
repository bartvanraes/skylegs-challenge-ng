import { NgModule } from "@angular/core";
import { FlightOverviewComponent } from './flight-overview/flight-overview.components';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { flightRoutes } from './flight.route';
import { flightReducers } from './store';
import { FlightOverviewEffects } from './store/flight-overview/flight-overview.effects';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

// basically the whole application is in this module since there is only one page (with 2 components)
@NgModule({
    declarations: [ 
        FlightOverviewComponent,
        FlightDetailComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(flightRoutes),
        StoreModule.forFeature('flightOverview', flightReducers),
        EffectsModule.forFeature([
            FlightOverviewEffects
        ]),
        CollapseModule.forRoot(),
        PaginationModule.forRoot(),
        ButtonsModule.forRoot(),
        ModalModule.forRoot(),
        MatIconModule
    ],
    providers: [
        FlightService
    ]
})
export class FlightModule {

}