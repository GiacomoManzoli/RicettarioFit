import {Injectable, forwardRef, Inject} from '@angular/core'

import { User } from '../model/user'

import {Http, Headers, RequestOptions} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {ErrorService} from "./error.service";
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {


    private headers = new Headers({ "Content-Type": "application/json" });
    private options = new RequestOptions({ headers: this.headers, withCredentials: true  });

    user : User;

    watchers : any[] = [];

    constructor(
        private http: Http,
        private errorService : ErrorService
    ) {


    }

    addWatcher(callback : any) {
        this.watchers.push(callback);
    }


    signIn(username : string, password : string) {
        let url = environment.API_URL + '/signin';
        console.log(url);
        return this.http.post(url, {
            username: username,
            password: password
        }, this.options)
            .toPromise()
            .then((response) => {
                let jsonResponse = response.json();
                console.log(jsonResponse);
                this.user = new User(jsonResponse.id,username);
                this.watchers.forEach(x => x());
            })
            .catch((err) => this.errorService.handleError(err));

    }

    signOut() {
        let url = environment.API_URL  + '/signout';
        return this.http.post(url, {}, this.options)
            .toPromise()
            .then((response) => {
                this.user = null;
                return response.json()
            })
            .catch((err) => this.errorService.handleError(err));

    }

    signUp() {
        // TODO
    }

}
