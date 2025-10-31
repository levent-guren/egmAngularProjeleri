import { AbstractControl, ValidationErrors } from "@angular/forms";

export function sifreValidator(control: AbstractControl): ValidationErrors | null {
    const val: string = control.value;
    if (!val || val == '') {
        return null;
    }
    if (val.match(/[A-Z]/) && val.match(/[a-z]/)) {
        // hata yok
        return null;
    }
    if (!val.match(/[A-Z]/)) {
        return { sifre: 'Şifrede büyük harf bulunmalıdır' };
    }
    if (!val.match(/[a-z]/)) {
        return { sifre: 'Şifrede ufak harf bulunmalıdır' };
    }
    return { sifre: 'Şifre hatalıdır' };
}
