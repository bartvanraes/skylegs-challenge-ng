import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { IFlight } from 'src/lib/flight';
import {Md5} from 'ts-md5/dist/md5';

const httpOptions = {
    headers: new HttpHeaders({
        //'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('skylegs-hiring-2020:skylegs-hiring-token'),
        'Accept': 'text/plain',
        /*'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'*/
    })
  };

@Injectable()
export class FlightService {
    public constructor(private http: HttpClient) {}

    public getAllFlights(): Observable<Array<IFlight>> {
        return this.http.get(`http://api.skylegs-staging.com/v1/flights/all?start=2019-01-01&end=2019-12-31`, httpOptions) as Observable<Array<IFlight>>;
    }

    public updateCosmicRadiation(flight: IFlight, value: number) {
        const body: Array<any> = [
            { FlightLog: 'SKYLEGS-TEST' }, // Can't find this in the get request data, so it's hardcoded
            { ACFTAIL: flight.aircraft.registration },
            { DEP: flight.departure.icao },
            { DEST: flight.arrival.icao },
            { STD: flight.tot }, // or obt?
            { STA: flight.ldt }, // or ibt?
            { ATCID: 'SKY2019' },            // Can't find this in the get request data, so it's hardcoded,
            { Dose: value },
            { Certificate: Md5.hashStr(`${flight.aircraft.registration}${flight.departure.icao}${flight.arrival.icao}${flight.tot}${flight.ldt}SKY2019${value}`) as string }
        ];

        /*const body: {} = {
            FlightLog: 'SKYLEGS-TEST', // Can't find this in the get request data, so it's hardcoded
            ACFTAIL: flight.aircraft.registration,
            DEP: flight.departure.icao,
            DEST: flight.arrival.icao,
            STD: flight.tot, // or obt?
            STA: flight.ldt, // or ibt?
            ATCID: 'SKY2019',            // Can't find this in the get request data, so it's hardcoded,
            Dose: value,
            Certificate: Md5.hashStr(`${flight.aircraft.registration}${flight.departure.icao}${flight.arrival.icao}${flight.tot}${flight.ldt}SKY2019${value}`) as string
        };*/
         
        return this.http.post(`http://api.skylegs-staging.com/v1/flights/store-radiation`, body, httpOptions) as Observable<Array<IFlight>>;
    }
}