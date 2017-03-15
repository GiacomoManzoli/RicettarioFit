import { Component, Input, OnInit} from "@angular/core"
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Location} from '@angular/common'

import 'rxjs/add/operator/switchMap'
import {UserService} from "../../service/user.service";




@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl : 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit{
    username : string;
    password : string;

    constructor(
        private userService : UserService,
        private router : Router
    ) { }

    ngOnInit() {
        this.userService.user = null;
    }

    login(){
        this.userService.signIn(this.username, this.password)
            .then(() => {
                this.router.navigate(["/recipes"]);
            }).catch(() => {});
    }

}