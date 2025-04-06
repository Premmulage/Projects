import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvironmentSelectionComponent } from './components/environment-selection/environment-selection.component';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EnvironmentSelectionComponent,
    AccountDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // <-- Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
