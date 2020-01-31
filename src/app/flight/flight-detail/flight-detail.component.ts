import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import { IFlight } from 'src/lib/flight';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'flight-detail',
    templateUrl: './flight-detail.component.html',
    styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit, OnDestroy {
    @Input() flight: IFlight;

    private ngUnsubscribe: Subject<Subscription> = new Subject();

    public constructor(private store: Store<IAppState>) {

    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}