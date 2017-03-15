import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import {AppRoutingModule} from "./app-routing.module";

import { UserService} from "./service/user.service";

import {AppComponent} from "./components/app.component";
import {LoginComponent} from "./components/login-component/login.component";
import {IngredientsListComponent} from "./components/ingredients-list-component/ingredients-list.component";
import {IngredientsService} from "./service/ingredients.service";
import {AuthGuard} from "./guards/auth.guard";
import {RecipesPageComponent} from "./components/recipe-components/recipes-page-component/recipes-page.component";
import {NavigationComponent} from "./components/navigation-component/navigation.component";
import {RecipesService} from "./service/recipes.service";
import {IngredientsPageComponent} from "./components/ingredients-page-component/ingredients-page.component";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AddRecipePageComponent} from "./components/recipe-components/add-recipe-page-component/add-recipe-page.component";
import {RecipePageComponent} from './components/recipe-components/recipe-page-component/recipe-page.component';
import {MealsPageComponent} from "./components/meal-components/meals-page-component/meals-page.component";
import {MealsService} from "./service/meals.service";
import {AddMealPageComponent} from "./components/meal-components/add-meal-page-component/add-meal-page.component";
import {MealPageComponent} from "./components/meal-components/meal-page-component/meal-page.component";
import {AddIngredientDialogComponent} from "./components/add-ingredient-dialog-component/add-ingredient-dialog.component";
import {ErrorService} from "./service/error.service";
import {MealComponent} from "./components/meal-components/meal-component/meal.component";
import {EditMealPageComponent} from "./components/meal-components/edit-meal-page-component/edit-meal-page.component";
import {IngredientNameComponent} from "./components/ingredient-name-component/ingredient-name.component";
import {RecipeComponent} from "./components/recipe-components/recipe-component/recipe.component";
import {EditRecipePageComponent} from "./components/recipe-components/edit-recipe-page-component/edit-recipe-page.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        IngredientsListComponent,
        IngredientNameComponent,
        RecipesPageComponent,
        RecipeComponent,
        EditRecipePageComponent,
        NavigationComponent,
        IngredientsPageComponent,
        AddRecipePageComponent,
        RecipePageComponent,
        MealComponent,
        MealsPageComponent,
        EditMealPageComponent,
        AddMealPageComponent,
        MealPageComponent,
        AddIngredientDialogComponent
    ],
    providers: [
        AuthGuard,
        UserService,
        IngredientsService,
        RecipesService,
        MealsService,
        ErrorService
    ],
    bootstrap:    [ AppComponent ],
    entryComponents: [ AddIngredientDialogComponent, ]
})

export class AppModule { }
