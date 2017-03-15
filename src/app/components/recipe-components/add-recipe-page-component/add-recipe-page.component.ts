import {Component, OnInit} from "@angular/core";
import {Recipe} from "../../../model/recipe";
import {Router} from "@angular/router";
import {RecipesService} from "../../../service/recipes.service";
import {MdSnackBar} from "@angular/material";

@Component({
    moduleId: module.id,
    selector: 'my-add-recipe-page',
    templateUrl: 'add-recipe-page.component.html'
})
export class AddRecipePageComponent implements OnInit{
    recipe : Recipe; // Recipe per l'aggiunta

    constructor(
        private recipesService : RecipesService,
        private router : Router,
        private snackBar : MdSnackBar
    ) { }

    ngOnInit() {
        this.recipe = new Recipe();
    }

    addNewRecipe(recipe : Recipe) {
        this.recipesService
            .createRecipe(recipe)
            .then(() => {
                this.router.navigate(['/recipes']);
                this.snackBar.open("Ricetta creata", "CHIUDI");
            }).catch(() => {});
    }

    onAbort() {
        this.router.navigate(['/recipes']);

    }
}