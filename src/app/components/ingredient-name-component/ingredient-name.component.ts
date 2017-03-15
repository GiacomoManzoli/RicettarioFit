import {Component, OnInit, Input} from "@angular/core";
import {Ingredient} from "../../model/ingredient";
import {UserService} from "../../service/user.service";

@Component({
    moduleId: module.id,
    selector: 'my-ingredient-name',
    templateUrl: 'ingredient-name.component.html'
})
export class IngredientNameComponent implements OnInit {
    @Input() ingredient : Ingredient;

    userId : number;
    constructor(private userService : UserService) {  }

    ngOnInit() {
        this.userId = this.userService.user.id;
    }
}