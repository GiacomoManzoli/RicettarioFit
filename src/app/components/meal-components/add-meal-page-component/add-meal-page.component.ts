import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Meal} from "../../../model/meal";
import {MealsService} from "../../../service/meals.service";
import {MdSnackBar} from "@angular/material";

@Component({
    moduleId: module.id,
    selector: 'my-add-meal-page',
    templateUrl: 'add-meal-page.component.html'
})
export class AddMealPageComponent{
    meal : Meal; // Meal per l'aggiunta

    constructor(
        private mealsService : MealsService,
        private router : Router,
        private snackBar : MdSnackBar) {

        this.meal = new Meal();
    }

    addNewMeal(meal : Meal) {

        this.mealsService.createMeal(meal)
            .then(() => {
                this.router.navigate(['/meals']);
                this.snackBar.open("Pasto aggiunto", "CHIUDI");
            })
            .catch(() => {});
    }

    abort() {
        this.router.navigate(['/meals']);
    }
}