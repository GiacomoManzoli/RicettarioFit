import {Component, OnInit, ViewChild, ElementRef, Renderer} from '@angular/core'
import {UserService} from "../service/user.service";
import {MdSidenav} from "@angular/material";
import {Router, NavigationStart, NavigationEnd} from "@angular/router";

import 'rxjs/add/operator/filter';

@Component({
    moduleId : module.id,
    selector:'my-app',
    templateUrl:'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements  OnInit {
    title = 'Ricettario Fit';

    logged = false;

    @ViewChild('sidenav') sidenav:MdSidenav;
    @ViewChild('toggleButton') el:ElementRef;

    constructor(private userSerivce : UserService,
                private router : Router,
                private rd : Renderer){
        /*
        implemnetazione laggosa
        router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event:any) => {
                if (this.el){
                    this.rd.invokeElementMethod(this.el.nativeElement,'focus');
                }
                this.sidenav.opened = false;
                this.sidenav.close();
            });*/
    }

    ngOnInit() {
        this.logged = this.userSerivce.user != null;

        let me = this;
        this.userSerivce.addWatcher(() => {me.logged = true});

    }


}
