import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IFlight } from 'src/lib/flight';

@Injectable()
export class FlightService {
    public constructor(private http: HttpClient) {}

    public getAllFlights(): Observable<Array<IFlight>> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Basic ' + btoa('skylegs-hiring-2020:skylegs-hiring-token')
            })
          };

        return this.http.get(`http://api.skylegs-staging.com/v1/flights/all?start=2019-01-01&end=2019-12-31`, httpOptions) as Observable<Array<IFlight>>;
    }
}