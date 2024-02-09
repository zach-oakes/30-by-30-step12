import { Injectable } from '@angular/core';
import {Session} from "./session";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  createSession(session: Session): void {
    sessionStorage.setItem(session.id, JSON.stringify(session));
  }

  getSession(id: string): Session | null {
    const sessionItem = sessionStorage.getItem(id);

    if (sessionItem) {
      return JSON.parse(sessionItem) as Session;
    }

    return null;
  }

  deleteSession(id: string): void {
    sessionStorage.removeItem(id);
  }
}
