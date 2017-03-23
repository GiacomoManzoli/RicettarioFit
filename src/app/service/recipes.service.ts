
import {Injectable} from '@angular/core'



import {Http, Headers, RequestOptions} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {Recipe} from "../model/recipe";
import {UserService} from "./user.service";
import {ErrorService} from "./error.service";
import {environment} from "../../environments/environment";


@Injectable()
export class RecipesService {

    private headers = new Headers({ "Content-Type": "application/json" });
    private options = new RequestOptions({ headers: this.headers, withCredentials: true  });


    constructor(private http: Http, private userService : UserService, private errorService : ErrorService) {}

    createRecipe(recipe : Recipe) : Promise<Recipe> {
        let url = environment.API_URL +"/recipes";
        return this.http.post(url, {
                user: this.userService.user,
                recipe: recipe
            }, this.options)
            .toPromise()
            .then(response => {
                recipe.id = response.json().recipeId;
                return recipe;
            })
            .catch((err) => this.errorService.handleError(err));
    }

    getRecipes() : Promise<Recipe[]> {
        let url = environment.API_URL +"/recipes";
        return this.http.get(url, this.options)
            .toPromise()
            .then( response => response.json())
            .then( data => {
                return data.map( x => {
                    let y = new Recipe();
                    y.initWithJSON(x);
                    return y;
                });
            })
            .catch((err) => this.errorService.handleError(err));

    }
    getRecipe(id: number) : Promise<Recipe> {
        let url = environment.API_URL +`/recipes/${id}`;
        return this.http.get(url, this.options)
            .toPromise()
            .then( response => response.json())
            .then( data => {
                let y = new Recipe();
                y.initWithJSON(data);
                return y;
            })
            .catch((err) => this.errorService.handleError(err));
    }

    updateRecipe(recipe : Recipe) : Promise<void> {
        return this.deleteRecipe(recipe)
            .then(() => this.createRecipe(recipe))
            .then(() => {});
    }

    deleteRecipe(recipe : Recipe) : Promise<void> {
        let url = environment.API_URL +`/recipes/${recipe.id}`;
        return this.http.delete(url, this.options)
            .toPromise()
            .then(() => {})
            .catch((err) => this.errorService.handleError(err));
    }
}
