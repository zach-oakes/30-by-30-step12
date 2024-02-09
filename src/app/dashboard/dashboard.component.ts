import {Component} from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public userService: UserService) {}
}
