import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from "@angular/core";
import {Meal} from "../../../model/meal";
import {RecipesService} from "../../../service/recipes.service";
import {IngredientsService} from "../../../service/ingredients.service";
import {Ingredient} from "../../../model/ingredient";
import {Recipe} from "../../../model/recipe";
import {MealIngredient} from "../../../model/meal-ingredient";
import {MealRecipe} from "../../../model/meal-recipe";

@Component({
    moduleId: module.id,
    selector: 'my-meal',
    templateUrl: 'meal.component.html',
    styleUrls: ['meal.component.css']
})
export class MealComponent implements OnInit, OnChanges {
    @Input() meal: Meal;

    private actionText = "";

    @Input() editMode: boolean = false; // Variabile che specifica se l'ambiente è quello di modifca
    @Input() addMode: boolean = false; // Variabile che specifica se l'ambiente è quello di creazione

    @Output() onPerfomAction: EventEmitter<any> = new EventEmitter();
    @Output() onAbortAction: EventEmitter<any> = new EventEmitter();

    mealTagsString : string = "";

    // Edit mode data source
    ingredientsFull : Ingredient[]; // Lista completa
    ingredients : Ingredient[]; // Lista filtrata
    recipesFull : Recipe[];
    recipes : Recipe[];

    constructor(private ingredientsService : IngredientsService,
                private recipesService : RecipesService) {
    }

    ngOnInit() {
        if (this.editMode || this.addMode) {
            this.getAll();
            if (this.editMode) this.actionText = "MODIFICA PASTO";
            if (this.addMode) this.actionText = "CREA PASTO";
        }
    }

    ngOnChanges() {
        if (this.meal) {
            console.log(this.meal);
            this.mealTagsString = this.meal.tags.join(', ');
        }
    }

    getAll() {
        this.ingredientsService.getIngredients()
            .then((x) => {
                this.ingredients = x;
                this.ingredientsFull = x;
            }).catch(() => {});

        this.recipesService.getRecipes()
            .then((x) => {
                this.recipes = x;
                this.recipesFull = x;
            }).catch(() => {});
    }


    _onPerformAction() : void {
        // Solo se sono in editMode o addMode viene utilzizato this.mealTagsString (!= "")
        if (this.mealTagsString != "") this.meal.tags = this.mealTagsString.split(',').map(x => x.trim());
        this.onPerfomAction.emit(this.meal);
    }

    _onAbortAction() : void {
        this.onAbortAction.emit();
    }


    // Filtro per la lista degli ingredienti in aggiunta o modifica
    search(name : string){
        name = name.toLocaleLowerCase();
        this.ingredients = this.ingredientsFull.filter((x) => x.name.toLocaleLowerCase().indexOf(name) != -1);
        this.recipes = this.recipesFull.filter((x) => x.name.toLocaleLowerCase().indexOf(name) != -1);
    }


    // Gestore selezione di un recipe in aggiunta o modifica
    onRecipesSelect(recipe : Recipe){
        let mealRecipe = new MealRecipe();
        mealRecipe.recipe = recipe;
        mealRecipe.qty = 1;
        this.meal.mealRecipes.push(mealRecipe);
    }
    // Gestore selezione di un ingrediente in aggiunta o modifica
    onIngredientSelect(ingredient : Ingredient) {
        let mealIngredient = new MealIngredient();
        mealIngredient.ingredient = ingredient;
        mealIngredient.qty = 100;
        this.meal.mealIngredients.push(mealIngredient);
    }

    onRemoveRecipe(mealRecipe : MealRecipe) {
        this.meal.mealRecipes = this.meal.mealRecipes.filter(item => item !== mealRecipe);
    }

    onRemoveIngredient(mealIngredient : MealIngredient) {
        this.meal.mealIngredients = this.meal.mealIngredients.filter(item => item !== mealIngredient);

    }
}