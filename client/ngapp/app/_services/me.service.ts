import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from './../../data/model.interface';

@Injectable()
export class MeService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private meUri = 'api/v1/me';  // URL to web api

    private me: User;

    constructor(private http: Http) { }

    getMe(): Promise<User> {
        if (this.me) return Promise.resolve(this.me);
        return this.http.get(this.meUri)
            .toPromise()
            .then(response => {
                this.me = response.json().data as User;
                return this.me;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error connecting to the server. Please try it again or contact IT support. ', error);
        return Promise.reject(error.message || error);
    }
}