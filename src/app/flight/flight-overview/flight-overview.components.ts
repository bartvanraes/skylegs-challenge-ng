import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import { GetAllFlights, UpdateCurrentFlightPage } from '../store/flight-overview/flight-overview.actions';
import { Subject, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { IFlight } from 'src/lib/flight';
import { getFlightOverviewState } from '../store';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'flight-overview',
    templateUrl: './flight-overview.component.html',
    styleUrls: ['./flight-overview.component.scss']
})
export class FlightOverviewComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<Subscription> = new Subject();

    public flights: Observable<Array<IFlight>>;
    public pagedFlights: Observable<Array<IFlight>>;
    public numberOfFlights: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    public currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);


    public constructor(private store: Store<IAppState>) {
    }

    ngOnInit(): void {
        // request all the flights
        this.store.dispatch(new GetAllFlights());

        // get all the flights from the store
        this.flights = this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.flights),
            takeUntil(this.ngUnsubscribe));
        // get the paged flights from the store
        this.pagedFlights = this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.pagedFlights),
            takeUntil(this.ngUnsubscribe));

        // set the number of flights for paging
        this.flights.subscribe((flights: Array<IFlight>) => {
            if (flights) {
                this.numberOfFlights.next(flights.length);
            } else {
                this.numberOfFlights.next(0);
            }
        });

        // check if the page of the paging component changes, if so update the store
        this.currentPage.subscribe((page: number) => this.store.dispatch(new UpdateCurrentFlightPage(page)));
    }

    pageChanged(event: any): void {
        this.currentPage.next(event.page);
      }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}