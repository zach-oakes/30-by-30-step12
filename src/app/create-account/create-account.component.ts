import {Component} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
    hidePassword = true;
    hideConfirmPassword = true;
    username = '';
    password = '';
    confirmPassword = '';
    accountExists = false;

    constructor(private userService: UserService, private router: Router) {}

    createAccount(): void {
        const user = this.userService.findUserAccount({
            username: this.username,
            password: this.password,
        });

        if (user) {
            this.accountExists = true;
            return;
        }

        this.userService.createUserAccount(this.username, this.password);
        this.router.navigate(['/login']);
    }

    get isDisabled(): boolean {
        return this.isEmpty ||
            !this.passwordsAreEqual ||
            !this.hasSpecialCharacter ||
            !this.hasUppercase ||
            !this.hasCorrectPasswordLength;
    }

    private get isEmpty(): boolean {
        return this.username === '' ||
            this.username === undefined ||
            this.password === '' ||
            this.password === undefined;
    }

    private get passwordsAreEqual(): boolean {
        return this.password === this.confirmPassword;
    }

    private get hasSpecialCharacter(): boolean {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        return regex.test(this.password) || regex.test(this.confirmPassword);
    }

    private get hasUppercase(): boolean {
        const regex = /[A-Z]+/;

        return regex.test(this.password) || regex.test(this.confirmPassword);
    }

    private get hasCorrectPasswordLength(): boolean {
        return this.password.length >= 5 || this.confirmPassword.length >= 5;
    }

}
