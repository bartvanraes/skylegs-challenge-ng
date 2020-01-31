import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RootEffects {
    public constructor(private http: HttpClient, private actions$: Actions) {
    
    }
}