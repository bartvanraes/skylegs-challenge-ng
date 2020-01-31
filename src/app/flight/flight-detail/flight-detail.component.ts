import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import { IFlight } from 'src/lib/flight';
import { Subject, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectFlight } from '../store/flight-overview/flight-overview.actions';
import { getFlightOverviewState } from '../store';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'flight-detail',
    templateUrl: './flight-detail.component.html',
    styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit, OnDestroy {
    @Input() flight: IFlight;

    public selectedFlight: Observable<IFlight>;
    public isCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);    
    
    private ngUnsubscribe: Subject<Subscription> = new Subject();

    public constructor(private store: Store<IAppState>, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'more-details',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/keyboard_arrow_down-24px.svg'));
        iconRegistry.addSvgIcon(
            'less-details',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/keyboard_arrow_up-24px.svg'));
    }

    ngOnInit(): void {
        this.selectedFlight = this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.selectedFlight),
            takeUntil(this.ngUnsubscribe));

        this.selectedFlight.subscribe((selectedFlight: IFlight) => {
            if (selectedFlight && this.flight) {
                console.log('isCollapsed');
                console.log(selectedFlight.id !== this.flight.id);
                this.isCollapsed.next(selectedFlight.id !== this.flight.id);
            }
        })
        
    }

    setSelectedFlight(flight: IFlight) {
        this.isCollapsed.next(!this.isCollapsed.value);
        
        this.store.dispatch(new SelectFlight(flight));
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}