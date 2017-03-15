import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login-component/login.component'
import {IngredientsListComponent} from "./components/ingredients-list-component/ingredients-list.component";
import {AuthGuard} from "./guards/auth.guard";
import {RecipesPageComponent} from "./components/recipe-components/recipes-page-component/recipes-page.component";
import {IngredientsPageComponent} from "./components/ingredients-page-component/ingredients-page.component";
import {AddRecipePageComponent} from "./components/recipe-components/add-recipe-page-component/add-recipe-page.component";
import {RecipePageComponent} from "./components/recipe-components/recipe-page-component/recipe-page.component";
import {MealsPageComponent} from "./components/meal-components/meals-page-component/meals-page.component";
import {AddMealPageComponent} from "./components/meal-components/add-meal-page-component/add-meal-page.component";
import {MealPageComponent} from "./components/meal-components/meal-page-component/meal-page.component";
import {EditMealPageComponent} from "./components/meal-components/edit-meal-page-component/edit-meal-page.component";
import {EditRecipePageComponent} from "./components/recipe-components/edit-recipe-page-component/edit-recipe-page.component";

const routes : Routes = [
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'ingredients',
        component: IngredientsPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'recipes',
        component: RecipesPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'add-recipe',
        component: AddRecipePageComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'recipes/:id',
        component: RecipePageComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'edit-recipe/:id',
        component: EditRecipePageComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'meals',
        component: MealsPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'add-meal',
        component: AddMealPageComponent,
        canActivate: [AuthGuard]
    },{
        path:'meals/:id',
        component: MealPageComponent,
        canActivate: [AuthGuard]
    },{
        path:'edit-meal/:id',
        component: EditMealPageComponent,
        canActivate: [AuthGuard]
    },/*
    {
        path:'detail/:id', // Passaggio di parametri su route
        component: HeroDetailComponent
    },*/
    {
        path: '',
        redirectTo: '/login',
        pathMatch:'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})

export class AppRoutingModule {}
