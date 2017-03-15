import {Ingredient} from "../model/ingredient";

import {Injectable} from '@angular/core'



import {Http, Headers, RequestOptions} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {ErrorService} from "./error.service";
import {environment} from "../../environments/environment";


@Injectable()
export class IngredientsService {

    private headers = new Headers({ "Content-Type": "application/json" });
    private options = new RequestOptions({ headers: this.headers, withCredentials: true  });

    constructor(
        private http: Http,
        private errorService : ErrorService
    ) {}

    getIngredients() : Promise<Ingredient[]> {
        let url = environment.API_URL +"/ingredients";
        return this.http.get(url, this.options)
            .toPromise()
            .then(response => {
                return response.json().map((x)=> {
                    let ing = new Ingredient();
                    ing.initWithJSON(x);
                    return ing;
                });
            })
            .catch((err) => this.errorService.handleError(err));
    }

    createIngredient(ingredient : Ingredient) : Promise<Ingredient> {
        let url = environment.API_URL +"/ingredients";
        return this.http.post(url, {
            ingredient: ingredient
        }, this.options)
            .toPromise()
            .then(response => {
                ingredient.id = response.json().ingredientId;
                console.log(ingredient);
                return ingredient;
            })
            .catch((err) => this.errorService.handleError(err));

    }
}
