import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {Ingredient} from "../../model/ingredient";


@Component({
    moduleId: module.id,
    selector: 'my-add-ingredient-dialog-component',
    templateUrl: 'add-ingredient-dialog.component.html',
    styleUrls: ['add-ingredient-dialog.component.css']
})
export class AddIngredientDialogComponent implements OnInit{

    ingredient : Ingredient;

    constructor(
        private dialogRef : MdDialogRef<AddIngredientDialogComponent>
    ) {}

    ngOnInit() {
        this.ingredient = new Ingredient();
    }

    onConfirm() {
        this.dialogRef.close(this.ingredient);
    }

    onCancel() {
        this.dialogRef.close(null);
    }
}