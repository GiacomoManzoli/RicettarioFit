import {Meal} from "../model/meal";

import {Injectable} from '@angular/core'



import {Http, Headers, RequestOptions} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {UserService} from "./user.service";
import {ErrorService} from "./error.service";
import {environment} from "../../environments/environment";


@Injectable()
export class MealsService {

    private headers = new Headers({ "Content-Type": "application/json" });
    private options = new RequestOptions({ headers: this.headers, withCredentials: true  });

    constructor(private http: Http, private userService : UserService, private errorService : ErrorService) {}

    createMeal(meal : Meal) : Promise<Meal> {
        let url = environment.API_URL +"/meals";
        return this.http.post(url, {
            user: this.userService.user,
            meal: meal
        }, this.options)
            .toPromise()
            .then(response => {
                meal.id = response.json().recipeId;
                return meal;
            })
            .catch((err) => this.errorService.handleError(err));

    }

    getMeals() {
    let url = environment.API_URL + "/meals";
    return this.http.get(url, this.options)
        .toPromise()
        .then(response => response.json())
        .then(data => {
            return data.map(x => {
                console.log(x);
                return new Meal().initWithJSON(x);
            });
        })
        .catch((err) => this.errorService.handleError(err));

    }
    getMeal(id: number) : Promise<Meal> {
        let url = environment.API_URL +`/meals/${id}`;
        return this.http.get(url,this.options)
            .toPromise()
            .then( response => response.json())
            .then( data => {
                return new Meal().initWithJSON(data);
            })
            .catch((err) => this.errorService.handleError(err));

    }

    updateMeal(meal: Meal) : Promise<void> {
        return this.deleteMeal(meal)
            .then(() => this.createMeal(meal))
            .then(() => { console.log("Ultimo then del service")});
    }

    deleteMeal(meal : Meal) : Promise<void> {
        let url = environment.API_URL +`/meals/${meal.id}`;
        return this.http.delete(url, this.options)
            .toPromise()
            .then(() => {})
            .catch((err) => this.errorService.handleError(err));
    }
}
