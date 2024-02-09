import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SessionService} from "./session.service";
import CookieUtil from "./cookie-util";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private sessionService: SessionService) {
        // set initial value for is authenticated by checking to see if we have a session
        const id = CookieUtil.getIdFromCookie();

        if (id !== '') {
            const session = this.sessionService.getSession(id);

            this.isAuthenticated$.next(session !== null);
        }
    }

    setIsAuthenticated(authenticated: boolean): void {
        this.isAuthenticated$.next(authenticated);
    }

    getIsAuthenticated(): BehaviorSubject<boolean> {
        return this.isAuthenticated$;
    }
}
