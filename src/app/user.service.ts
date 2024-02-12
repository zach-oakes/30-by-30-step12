import {Injectable} from '@angular/core';
import { v4 } from 'uuid'
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userAccounts : User[] = [];
  loggedInUser = {} as User;

  createUserAccount(username: string, password: string): void {
    const id = v4();

    this.userAccounts.push({id, username, password});

    // Set a redundant copy in session storage so we don't lose the data on a refresh
    sessionStorage.setItem(username, password);
  }

  findUserAccount(toFind: User): User | undefined {
    const found = this
        .userAccounts
        .find(u => u.username === toFind.username && u.password === toFind.password);

    if (found) {
      return found;
    }

    // check session storage
    const localPassword = sessionStorage.getItem(toFind.username);
    if (localPassword && localPassword === toFind.password) {
      return {
        username: toFind.username,
        password: localPassword,
      }
    }

    return undefined;
  }

  setLoggedInUser(user: User): void {
    this.loggedInUser = user;
    sessionStorage.setItem('username', user.username);
  }

  getLoggedInUser(): string | null {
    const sessionUsername = sessionStorage.getItem('username');

    if (this.loggedInUser.username) {
      return this.loggedInUser.username
    } else if (sessionUsername) {
      return sessionUsername;
    } else {
      return null;
    }
  }
}
