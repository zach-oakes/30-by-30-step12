import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {BehaviorSubject} from "rxjs";
import {SessionService} from "./session.service";
import CookieUtil from "./cookie-util";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Flight Tracker';
    isAuthenticated$: BehaviorSubject<boolean>;

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private sessionService: SessionService) {

        this.isAuthenticated$ = authService.getIsAuthenticated();
        this.isAuthenticated$.subscribe();
    }

    logout(): void {
        const id = CookieUtil.getIdFromCookie();

        if (id !== '') {
            // wipe the cookie and the kill the session
            CookieUtil.wipeCookie();
            this.sessionService.deleteSession(id);
        }

        this.authService.setIsAuthenticated(false);
        sessionStorage.setItem('username', '');

        this.router.navigate(['/login'])
            .then(() => {
                location.reload();
            });
    }
}
