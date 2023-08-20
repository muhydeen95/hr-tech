import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(private spinner: NgxSpinnerService) {

    }

    startSpinner() {
        this.spinner.show();
    }

    stopSpinner() {
        this.spinner.hide();
    }

}
