import { Component, OnInit} from "@angular/core"

import 'rxjs/add/operator/switchMap'
import {Recipe} from "../../../model/recipe";
import {RecipesService} from "../../../service/recipes.service";
import {Router} from "@angular/router";
import {MdSnackBar} from "@angular/material";


@Component({
    moduleId: module.id,
    selector: 'my-recipes-page',
    templateUrl : 'recipes-page.component.html',
    styleUrls: ['recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit{
    recipes : Recipe[]; // Lista di recipe da visualizzare
    selectedRecipe : Recipe;

    constructor(
        private recipesService: RecipesService,
        private snackBar : MdSnackBar,
        private router : Router
    ) { }

    ngOnInit() {
        this.recipesService.getRecipes()
            .then(recipes => {
                this.recipes = recipes;
            })
            .catch(() => {});
    }

    onSelectRecipe(recipe : Recipe) : void {
        if (this.selectedRecipe != recipe)
            this.selectedRecipe = recipe;
        else
            this.selectedRecipe = null;
    }

    onAdd() : void {
        this.router.navigate(['/add-recipe']);
    }

    showDetail(recipe : Recipe) : void {
        this.router.navigate([`/recipes`, recipe.id])
    }

    editRecipe(recipe : Recipe) {
        this.router.navigate([`/edit-recipe`, recipe.id]);
    }

    deleteRecipe(recipe : Recipe) {
        this.recipesService.deleteRecipe(recipe)
            .then(() => {
                this.recipes = this.recipes.filter(item => item !== recipe);
                this.snackBar.open("Ricetta eliminata", "CHIUDI");
            });
    }


}

