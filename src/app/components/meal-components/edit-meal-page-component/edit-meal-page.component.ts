import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {Meal} from "../../../model/meal";
import {MealsService} from "../../../service/meals.service";
import {MdSnackBar} from "@angular/material";

@Component({
    moduleId: module.id,
    selector: 'my-edit-meal-page',
    templateUrl: 'edit-meal-page.component.html'
})
export class EditMealPageComponent implements OnInit, OnDestroy{
    meal : Meal;
    sub : any;

    constructor(
        private mealsService : MealsService,
        private router : Router,
        private snackBar : MdSnackBar,
        private route : ActivatedRoute,
        private location : Location) {

        this.meal = new Meal();
    }

    ngOnInit() {
        this.meal = new Meal();
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.mealsService.getMeal(id)
                .then((meal) => this.meal = meal)
                .catch(() => {});
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    editMeal(meal : Meal) {
        this.mealsService.updateMeal(meal)
            .then(() => {
                this.router.navigate(['/meals', meal.id]);
                this.snackBar.open("Pasto modificato", "CHIUDI");
            })
            .catch(() => {});
    }

    abort() {
        this.location.back();
    }
}