import {Injectable} from "@angular/core";
import {MdSnackBar} from "@angular/material";
import {CustomError} from "../model/custom-error";
import {Router} from "@angular/router";
import {Response} from "@angular/http";

@Injectable()
export class ErrorService {

    constructor(
        private snackBar : MdSnackBar,
        private router : Router
    ) { }

    handleError(response : Response) : Promise<any> {
        let error : CustomError;
        if (response.json().message) {
            error = new CustomError(0,'').initWithJSON(response.json());
        } else {
            error = new CustomError(503, 'Non è stato possibile connettersi al server')
        }
        console.log(error);
        let snack = this.snackBar.open(error.message, "Chiudi", {
            duration: 60000,
        });

        if (error.status == 401 || error.status == 503) {
            snack.afterDismissed().subscribe(null, null, () => {
                // TODO: valutare se ri-effettuare il sign-in
                this.router.navigate(['/login']);
            });
        }

        return Promise.reject(error);
    }
}