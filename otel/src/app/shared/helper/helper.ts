import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class Helper {
    hataControl(name: string, form: FormGroup) {
        return this.getControl(name, form).touched && this.getControl(name, form).invalid;
    }

    getControl(name: string, form: FormGroup) {
        return form.get(name) as FormControl;
    }
}
