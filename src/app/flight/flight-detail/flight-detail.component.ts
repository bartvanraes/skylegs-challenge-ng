import { Component, OnInit, OnDestroy, Input, TemplateRef, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import { IFlight } from 'src/lib/flight';
import { Subject, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectFlight, UpdateRadiationDose } from '../store/flight-overview/flight-overview.actions';
import { getFlightOverviewState } from '../store';
import { takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'flight-detail',
    templateUrl: './flight-detail.component.html',
    styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit, OnDestroy {
    @Input() flight: IFlight;

    public cosmicValueForm: FormGroup;
    public showError: EventEmitter<string> = new EventEmitter<string>();
    public selectedFlight: Observable<IFlight>;
    public isCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public modalRef: BsModalRef;

    
    private ngUnsubscribe: Subject<Subscription> = new Subject();

    public constructor(
        private store: Store<IAppState>,
        private formBuilder: FormBuilder,
        private iconRegistry: MatIconRegistry, 
        private sanitizer: DomSanitizer, 
        private modalService: BsModalService) {
        iconRegistry.addSvgIcon(
            'more-details',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/keyboard_arrow_down-24px.svg'));
        iconRegistry.addSvgIcon(
            'less-details',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/keyboard_arrow_up-24px.svg'));
    }

    ngOnInit(): void {
        this.cosmicValueForm = this.formBuilder.group({
            cosmicValue: ['', [
                Validators.required,
                Validators.min(0)
            ]]
        });

        this.selectedFlight = this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.selectedFlight),
            takeUntil(this.ngUnsubscribe));

        this.selectedFlight.subscribe((selectedFlight: IFlight) => {
            if (selectedFlight && this.flight) {
                console.log('isCollapsed');
                console.log(selectedFlight.id !== this.flight.id);
                this.isCollapsed.next(selectedFlight.id !== this.flight.id);
            }
        });

        this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.radiationDoseUpdateCounter),
            takeUntil(this.ngUnsubscribe))
                .subscribe((counter: number) => {
                    // the update of the radiation dose was successfull so close the modal
                    if (this.modalRef) {
                        this.modalRef.hide();
                    }
                });

        this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.errorUpdatingRadiationDose),
            takeUntil(this.ngUnsubscribe)).subscribe((error: any) => {
                if (!!error) {
                    this.showError.next('Was unable to update the radiation dose of this flight');
                } else {
                    this.showError.next(null);
                }
            });
    }

    setSelectedFlight(flight: IFlight): void {
        this.isCollapsed.next(!this.isCollapsed.value);
        
        this.store.dispatch(new SelectFlight(flight));
    }

    openModal(template: TemplateRef<any>): void {
        this.modalRef = this.modalService.show(template);
    }

    confirm(): void {
        if (this.cosmicValueForm.valid) {
            this.store.dispatch(new UpdateRadiationDose(this.flight, this.cosmicValueForm.get('cosmicValue').value));
        }
    }
     
    decline(): void {
        this.modalRef.hide();
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}