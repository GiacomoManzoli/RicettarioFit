import { Component, OnInit} from "@angular/core"

import 'rxjs/add/operator/switchMap'
import {RecipesService} from "../../service/recipes.service";
import {AddIngredientDialogComponent} from "../add-ingredient-dialog-component/add-ingredient-dialog.component";
import {MdDialog, MdSnackBar} from "@angular/material";
import {Ingredient} from "../../model/ingredient";
import {IngredientsService} from "../../service/ingredients.service";


@Component({
    moduleId: module.id,
    selector: 'my-ingredients-page',
    templateUrl : 'ingredients-page.component.html',
    styleUrls: ['ingredients-page.component.css']
})
export class IngredientsPageComponent {

    ingredients : Ingredient[];
    ingredientsFiltered: Ingredient[];

    constructor(
        private ingredientsService : IngredientsService,
        private dialog: MdDialog,
        private snackBar : MdSnackBar
    ) {
        this.ingredientsFiltered = null;
    }

    onAdd() {
        let me = this;
        let dialogRef = this.dialog.open(AddIngredientDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result){
                console.log("New Ingredient");
                console.log(result);
                this.ingredientsService
                    .createIngredient(result)
                    .then((ingredient) => {
                        console.log("Promise di IngredientsService");
                        console.log(result);
                        me.ingredients.push(ingredient);
                        me.snackBar.open("Alimento aggiunto", "CHIUDI"); // TODO Capire perché le SnackBar non si vedono
                    })
                    .catch(() => {
                        console.log("ERRORE");});
            }
        });
    }

    getAll() {
        console.log("Getting ingredients...");
        this.ingredientsService.getIngredients()
            .then((x) => {
                this.ingredients = x;
                this.ingredientsFiltered = x;
                console.log("Got ingredients!");
            }).catch(() => {});
    }

    ngOnInit(): void {
        this.getAll();
    }


    search(name : string){
        name = name.toLocaleLowerCase();
        this.ingredientsFiltered = this.ingredients.filter((x) => x.name.toLocaleLowerCase().indexOf(name) != -1);
    }
}