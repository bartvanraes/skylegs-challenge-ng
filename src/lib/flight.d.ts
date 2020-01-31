//declare namespace Flights {
    export interface IFlight {
        id: number;
        mission_id: number;
        block_time: string;
        flight_time: string;
        actual_block_time: string;
        actual_flight_time: string;
        pax: number;
        crew_string: string;
        empty_leg: boolean;
        shared_leg: boolean;
        client_pdf_url: string;
        block_fuel: string;                 // any?
        actual_fuel_uplift_before: string;  // any?
        actual_fuel_start: string;
        actual_fuel_end: string;
        actual_fuel_uplift: string;         // any?
        hash: string;
        remarks: string;                    // any?
        number: number;                     // any?
        obt: Date;
        tot: Date;
        ldt: Date;
        ibt: Date;
        actual_obt: Date;
        actual_tot: Date;
        actual_ldt: Date;
        actual_ibt: Date;
        updated_at: Date;                   // any?
        created_at: Date;
        date: Date; // no time
        aircraft: IAircraft;
        mission: IMission;
        departure: IAirport;
        arrival: IAirport;
        userAgendas: Array<IUserAgenda>;

    }

    export interface IAircraft {
        id: number;
        registration: string;
        phone: string;
        label: string;
        large_picture_url: string;
        profile_picture_url: string;
        variant: {
            id: number;
            manufacturer: string;
            icao: string;
            model: string;
            mtow: number;
            label: string;
            range: number;
            cruise_speed: number;
            max_seats: number;
            logo_picture_url: string;
        }
    }

    export interface IMission {
        id: number;
        number: string;
        hash: string;
    }

    export interface IAirport {
        id: number;
        country_id: number;
        kind: string;
        icao: string;
        iata: string;
        name: string;
        city: string;
        distance_from_city: string;
        elevation: number;
        longitude: number;
        latitude: number;
        timezone: string;
        fuel: string;
        airport_of_entry: string;
        customs: boolean;
        designated_international: boolean;  // number?
        landing_rights: boolean;            // number?
        user_fees: boolean;                 // number?
        handling_mandatory: boolean;        // number?
        slots_required: boolean;            // number?
        approach: string;
        runways: string;
        length: number;
        width: number;
        label: string;
        country_name: string;
        departure: boolean;
    }

    export interface IUserAgenda {
        id: number;
        kind: string;
        pilot_in_command: boolean;
        pilot_flying: boolean;
        user: {
            id: number;
            code: string;
            first_name: string;
            last_name: string;
            phone: string;
        }
    }
//}