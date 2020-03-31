import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, defer} from 'rxjs';
import { IFlight } from 'src/lib/flight';
import {Md5} from 'ts-md5/dist/md5';


const skyLegsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'/*,
    'Authorization': 'Basic ' + btoa('skylegs-hiring-2020:skylegs-hiring-token'), // in a real application these values should come from a config file*/
});

const httpOptions = {
    headers: skyLegsHeaders
};

/*  Service to call the skylegs api 
    See proxy.conf.json for the root url, that file is used to configure CORS

    REMARK: The correct json format of the post call was a pain to figure out, my first attempt in Postman was 'successful' or at least that's what I though since the response 
    was the flight array from the get call.
    The format of that call was [{ "FlightLog": "SKYLEGS-TEST" }, { "ACFTAIL": "OO-DEMO" },... instead of [{"FlightLog": "SKYLEGS-TEST", "ACFTAIL": "OO-DEMO",...
    
    But in Angular the response was actually different: 
    "0.ACFTAIL": [
        "The 0. a c f t a i l field is required."
    ],
    "0.DEP": [
        "The 0. d e p field is required."
    ],
    "0.DEST": [
        "The 0. d e s t field is required."
    ],
    "0.STD": [
        "The 0. s t d field is required."
    ],
    "0.STA": [
        "The 0. s t a field is required."
    ],...

    This was probably caused by the 'Accept': 'application/json' header that Angular added.
    When I modified this header in this service the response was a 302 (redirect), which maybe explains why I got the flight array from the post call in Postman

    It would have been way easier if the body of the api call expected regular JSON instead of Array values, also the response should be JSON instead of a string
    
    Also there is an mistake in the challenge PDF about the post call, the certificate example (before md5 encryption) OO-DEMOEBBREGLC2019-10-08T11:30:00SKY2019
    is missing the dose.
    Another issue with the PDF: if you copy paste the urls and the username/token from the PDF (opened in Edge) then there are extra spaces and incorrect characters 
    which only complicates things even further.
*/
@Injectable()
export class FlightService {
    public constructor(private http: HttpClient) {
    }

    public getAllFlights(): Observable<Array<IFlight>> {
        // See proxy.conf.json for the root url
        return this.http.get(`v1/flights`, httpOptions) as Observable<Array<IFlight>>;
    }

    public updateCosmicRadiation(flight: IFlight, value: number): Observable<IFlight> {
        // Since the pdf document isn't really clear which exact fields has to be added to the body I took the ones that sounded most logical
        const md5Certificate: string = Md5.hashStr(`${flight.aircraft.registration}${flight.departure.icao}${flight.arrival.icao}${flight.tot}SKY2019${value}`) as string;

        const body: any = 
            { 
                FlightMissionId: flight.mission_id,      // Can't find this in the get request data, so it's hardcoded,
                Dose: value,
            }
        ;
         
        return this.http.post(`v1/flights/store-radiation`, body/*, { 
            headers: skyLegsHeaders,
            responseType: 'application/json' // expected response: 'Data received.'
        }*/) as Observable<IFlight>;
    }
}