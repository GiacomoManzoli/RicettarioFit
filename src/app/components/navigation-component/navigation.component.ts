import { Component, Input, OnInit} from "@angular/core"
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Location} from '@angular/common'

import 'rxjs/add/operator/switchMap'
import {UserService} from "../../service/user.service";


@Component({
    moduleId: module.id,
    selector: 'my-navigation',
    templateUrl : 'navigation.component.html',
    styleUrls: ['navigation.component.css']
})
export class NavigationComponent { }