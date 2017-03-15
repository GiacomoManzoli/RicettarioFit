import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {RecipeIngredient} from "../../../model/recipe-ingredient";
import {Ingredient} from "../../../model/ingredient";
import {Recipe} from "../../../model/recipe";
import {IngredientsService} from "../../../service/ingredients.service";
@Component({
    moduleId: module.id,
    selector: 'my-recipe-component',
    templateUrl: 'recipe.component.html',
    styleUrls: ['recipe.component.css']
})
export class RecipeComponent implements OnInit{
    @Input() addMode : boolean;
    @Input() editMode : boolean;

    @Input() recipe : Recipe;

    @Output() onPerfomAction: EventEmitter<any> = new EventEmitter();
    @Output() onAbortAction: EventEmitter<any> = new EventEmitter();

    actionText : string;

    ingredientsFull : Ingredient[]; // Lista completa
    ingredients : Ingredient[]; // Lista filtrata

    constructor(
        private ingredientsService : IngredientsService
    ) { }

    ngOnInit() {
        if (this.addMode) { this.actionText = "CREA RICETTA"; }
        if (this.editMode) { this.actionText = "MODIFICA RICETTA"; }
        this.getAll();
    }

    getAll() {
        this.ingredientsService.getIngredients()
            .then((x) => {
                this.ingredients = x;
                this.ingredientsFull = x;
            }).catch(() => {});
    }

    search(name : string){
        name = name.toLocaleLowerCase();
        this.ingredients = this.ingredientsFull.filter((x) => x.name.toLocaleLowerCase().indexOf(name) != -1);
    }

    onAddIngredient(ingredient : Ingredient) {
        let recipeIngredient = new RecipeIngredient(ingredient);
        this.recipe.recipeIngredients.push(recipeIngredient);
    }

    onRemoveIngredient(recipeIngredient : RecipeIngredient) {
        this.recipe.recipeIngredients = this.recipe.recipeIngredients.filter(item => item !== recipeIngredient);
    }

    onAction() {
        this.onPerfomAction.emit(this.recipe);
    }

    onAbort() {
        this.onAbortAction.emit();
    }
}