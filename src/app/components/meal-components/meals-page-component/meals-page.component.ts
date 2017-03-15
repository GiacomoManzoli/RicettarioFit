import { Component, OnInit} from "@angular/core"

import 'rxjs/add/operator/switchMap'
import {Router} from "@angular/router";
import {Meal} from "../../../model/meal";
import {MealsService} from "../../../service/meals.service";
import {MdSnackBar} from "@angular/material";


@Component({
    moduleId: module.id,
    selector: 'my-meals-page',
    templateUrl : 'meals-page.component.html'
})
export class MealsPageComponent implements OnInit{

    meals : Meal[]; // Lista di Meal da visualizzare

    selectedMeal : Meal;

    constructor(
        private mealsService: MealsService,
        private snackBar : MdSnackBar,
        private router : Router
    ) { }

    ngOnInit() {
        this.mealsService.getMeals()
            .then(meals => {
                console.log(meals);
                this.meals = meals;
            })
            .catch(() => {});
    }

    onSelectMeal(meal : Meal) : void {
        if (this.selectedMeal != meal)
            this.selectedMeal = meal;
        else
            this.selectedMeal = null;
    }

    onAdd() : void {
        this.router.navigate(['/add-meal']);
    }

    showDetail(meal : Meal) : void {
        this.router.navigate([`/meals`, meal.id]);
    }

    editMeal(meal : Meal) {
        this.router.navigate([`/edit-meal`, meal.id]);
    }

    deleteMeal(meal : Meal) {
        this.mealsService.deleteMeal(meal)
            .then(() => {
                this.meals = this.meals.filter(item => item !== meal);
                this.snackBar.open("Pasto eliminato", "CHIUDI");
            });
    }
}

