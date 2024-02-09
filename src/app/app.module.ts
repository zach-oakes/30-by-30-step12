import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { FlightDetailViewComponent } from './flight-detail-view/flight-detail-view.component';
import { FlightListViewComponent } from './flight-list-view/flight-list-view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatToolbar } from "@angular/material/toolbar";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatMenuItem, MatMenuModule } from "@angular/material/menu";
import { MatDrawer, MatDrawerContainer } from "@angular/material/sidenav";
import { MatDivider } from "@angular/material/divider";
import { MatActionList, MatListItem } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatCard } from "@angular/material/card";
import { MatChipListbox, MatChipOption } from "@angular/material/chips";
import { HttpClientModule } from "@angular/common/http";
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AuthenticationService} from "./authentication.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginScreenComponent,
    FlightDetailViewComponent,
    FlightListViewComponent,
    UnauthorizedComponent,
    CreateAccountComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbar,
    MatFormField,
    MatIcon,
    MatInput,
    MatIconButton,
    MatFormFieldModule,
    MatButton,
    MatLabel,
    MatMenuModule,
    MatMenuItem,
    MatDrawerContainer,
    MatDrawer,
    MatDivider,
    MatActionList,
    MatListItem,
    FormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatSelect,
    MatOption,
    MatCard,
    MatChipListbox,
    MatChipOption,
    HttpClientModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCheckbox,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinner
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
