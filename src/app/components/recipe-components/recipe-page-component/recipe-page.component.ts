import {Component, OnInit, OnDestroy} from "@angular/core";
import {Recipe} from "../../../model/recipe";
import {ActivatedRoute} from "@angular/router";
import {RecipesService} from "../../../service/recipes.service";

@Component({
    moduleId: module.id,
    selector: 'my-add-recipe-page',
    templateUrl: 'recipe-page.component.html'
})
export class RecipePageComponent implements OnInit, OnDestroy{
    recipe : Recipe; // Recipe per l'aggiunta

    sub : any;

    constructor(
        private recipesService : RecipesService,
        private route : ActivatedRoute) { }

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

}