import {inject} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";
import {SessionService} from "./session.service";
import CookieUtil from "./cookie-util";

export const authorizationGuard = () => {
    const authService = inject(AuthenticationService);
    const sessionService = inject(SessionService);

    const router = inject(Router);
    const id = CookieUtil.getIdFromCookie();

    // Check our session to see if we still have a valid session. Then set our BehaviorSubject accordingly.
    const s = sessionService.getSession(id);
    authService.setIsAuthenticated(s !== null);

    if (s) {
        return true;
    }

    // If we have not successfully logged in, then redirect to the unauthorized page.
    return router.navigate(['/unauthorized']);
};