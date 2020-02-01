import { Component, OnInit, OnDestroy, Input, TemplateRef, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store';
import { IFlight } from 'src/lib/flight';
import { Subject, Subscription, BehaviorSubject, Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectFlight, UpdateRadiationDose } from '../store/flight-overview/flight-overview.actions';
import { getFlightOverviewState } from '../store';
import { takeUntil, tap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'flight-detail',
    templateUrl: './flight-detail.component.html',
    styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit, OnDestroy {
    @Input() flight: IFlight; // the flight data gets passed through as an input parameter, this is not the same as the selectedFlight

    public cosmicValueForm: FormGroup;
    public showError: EventEmitter<string> = new EventEmitter<string>();
    public selectedFlight: Observable<IFlight>;
    public isCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public updateSuccessFull: Observable<boolean>;
    public modalRef: BsModalRef;

    
    private ngUnsubscribe: Subject<Subscription> = new Subject();

    public constructor(
        private store: Store<IAppState>,
        private formBuilder: FormBuilder,
        private modalService: BsModalService,
        iconRegistry: MatIconRegistry, 
        sanitizer: DomSanitizer) {
        
        // Register meterial icons
        iconRegistry.addSvgIcon(
            'more-details',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/keyboard_arrow_down-24px.svg'));
        iconRegistry.addSvgIcon(
            'less-details',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/keyboard_arrow_up-24px.svg'));
            iconRegistry.addSvgIcon(
                'success',
                sanitizer.bypassSecurityTrustResourceUrl('assets/img/done-24px.svg'));
    }

    ngOnInit(): void {
        // The cosmic radiation value form and its validators
        this.cosmicValueForm = this.formBuilder.group({
            cosmicValue: ['', [
                Validators.required,
                Validators.min(0)
            ]]
        });

        // Get the currently selected flight from the store
        this.selectedFlight = this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.selectedFlight),
            takeUntil(this.ngUnsubscribe));

        // Only expand the extra info panel if the flight is currently selected
        this.selectedFlight.subscribe((selectedFlight: IFlight) => {
            if (selectedFlight && this.flight) {
                this.isCollapsed.next(selectedFlight.id !== this.flight.id);
            }
        });

        // Hide the modal when the radiation value was updated successfully
        this.updateSuccessFull = this.store.pipe(
            select(state => getFlightOverviewState(state).flightOverview.radiationDoseUpdateSuccess),
            takeUntil(this.ngUnsubscribe),
            tap((success: boolean) => {
                if (success) {
                    if (this.modalRef) {
                        this.modalRef.hide();
                    }
                }
            }));

        // Show an error in the modal if the radiation value couldn't get updated because the post call failed
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

    // Gets called when the user clicks on the main panel of the control
    setSelectedFlight(flight: IFlight): void {
        // collapse the extra info panel if the user selects the same flight again
        this.isCollapsed.next(!this.isCollapsed.value);
        
        this.store.dispatch(new SelectFlight(flight));
    }

    // Gets called when the user clicks the 'Update cosmic radiation value' button
    openModal(template: TemplateRef<any>): void {
        this.modalRef = this.modalService.show(template);
    }

    // update radiation dose in the store, this will trigger the post api call
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