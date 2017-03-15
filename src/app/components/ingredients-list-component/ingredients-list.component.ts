import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core"

import 'rxjs/add/operator/switchMap'

import {Ingredient} from "../../model/ingredient";

@Component({
    moduleId: module.id,
    selector: 'my-ingredients-list',
    templateUrl : 'ingredients-list.component.html',
    styleUrls: ['ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit{
    @Input() actionName : string = "";
    @Input() ingredients : Ingredient[] = [];
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    ingredientsFiltered : Ingredient[]; // Lista di ingredienti filtrata

    constructor() {
    }

    ngOnInit(): void {
        this.ingredientsFiltered = this.ingredients;
    }

    search(name : string){
        name = name.toLocaleLowerCase();
        this.ingredientsFiltered = this.ingredients.filter((x) => x.name.toLocaleLowerCase().indexOf(name) != -1);
    }


    /*
    *   <my-ingredients-list
     [actionName]="'add'"
     (onSelect)="onIngredientSelect($event)"></my-ingredients-list>
    * */
    onSelectHandler(ingredient : Ingredient) : void {
        console.log("onSelectHandler");
        this.onSelect.emit(ingredient);

    }

}