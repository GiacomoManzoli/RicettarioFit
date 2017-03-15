import {Component, OnDestroy, OnInit} from "@angular/core";
import {Recipe} from "../../../model/recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipesService} from "../../../service/recipes.service";
import {MdSnackBar} from "@angular/material";

@Component({
    moduleId: module.id,
    selector: 'my-edit-recipe-page-component',
    templateUrl:'edit-recipe-page.component.html'
})
export class EditRecipePageComponent implements OnInit, OnDestroy{
    recipe : Recipe;

    private sub : any;

    constructor(
        private route : ActivatedRoute,
        private router : Router,
        private snackBar : MdSnackBar,
        private recipesService : RecipesService ) {}

    ngOnInit() {
        this.recipe = new Recipe();
        console.log(this.route.params);

        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.recipesService.getRecipe(id)
                .then(recipe => this.recipe = recipe)
                .catch(() => {});
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onPerformAction(recipe : Recipe) {
        this.recipesService.updateRecipe(recipe)
            .then(() => {
                this.router.navigate(['/recipes', recipe.id]);
                this.snackBar.open("Ricetta modificata", "CHIUDI");
            });
    }

    onAbortAction() {
        this.router.navigate(['/recipes']);
    }
}