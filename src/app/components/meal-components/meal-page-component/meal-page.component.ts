import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Meal} from "../../../model/meal";
import {MealsService} from "../../../service/meals.service";

@Component({
    moduleId: module.id,
    selector: 'my-meal-page',
    templateUrl: 'meal-page.component.html'
})
export class MealPageComponent implements OnInit, OnDestroy{
    meal : Meal;
    sub : any;

    constructor(
        private mealsService : MealsService,
        private router : Router,
        private route : ActivatedRoute
    ) {

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

    gotoEditMode(meal : Meal) {
        this.router.navigate(['/edit-meal', meal.id]);
    }
}