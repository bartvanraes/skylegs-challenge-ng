import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import { GetAllFlights, UpdateCurrentFlightPage } from '../store/flight-overview/flight-overview.actions';
import { Subject, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { IFlight } from 'src/lib/flight';
import { getFlightOverviewState } from '../store';
import { switchMap, map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'flight-overview',
    templateUrl: './flight-overview.component.html',
    styleUrls: ['./flight-overview.component.scss']
})
export class FlightOverviewComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<Subscription> = new Subject();

    public flights: Observable<Array<IFlight>>;
    public pagedFlights: Observable<Array<IFlight>>;
    public numberOfFlights: /*Observable<number>;*/BehaviorSubject<number> = new BehaviorSubject<number>(1);
    public currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);


    public constructor(private store: Store<IAppState>) {

    }

    ngOnInit(): void {
        this.store.dispatch(new GetAllFlights());
        this.flights = this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.flights),
            takeUntil(this.ngUnsubscribe));
        this.pagedFlights = this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.pagedFlights),
            takeUntil(this.ngUnsubscribe));
        /*this.numberOfFlights = this.flights.pipe(
            map((flights: Array<IFlight>) => flights.length)
        )*/

        this.flights.subscribe((flights: Array<IFlight>) => {
            if (flights) {
                this.numberOfFlights.next(flights.length);
            } else {
                this.numberOfFlights.next(0);
            }
        });

        this.currentPage.subscribe((page: number) => this.store.dispatch(new UpdateCurrentFlightPage(page)));
    }

    pageChanged(event: any): void {
        console.log(`current page: ${event.page}`);
        this.currentPage.next(event.page);
      }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}