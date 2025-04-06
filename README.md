# Projects



Steps:
 * Create a New Angular Application
   ng new simplified-account-dashboard --routing --style=css
cd simplified-account-dashboard

   * --routing: Sets up the AppRoutingModule for navigation.
   * --style=css: Uses plain CSS for styling (you can choose scss, sass, or less if you prefer).
 * Generate Components
   We need two main components:
   * EnvironmentSelection: For the initial screen.
   * AccountDashboard: For displaying the accounts, search, and add button.
   ng generate component components/environment-selection
ng generate component components/account-dashboard

 * Define Routing (src/app/app-routing.module.ts)
   Configure the routes so the user starts at the environment selection and then navigates to the dashboard.
   import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvironmentSelectionComponent } from './components/environment-selection/environment-selection.component';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';

const routes: Routes = [
  // Default route redirects to environment selection
  { path: '', redirectTo: '/select-environment', pathMatch: 'full' },
  // Route for the environment selection screen
  { path: 'select-environment', component: EnvironmentSelectionComponent },
  // Route for the main account dashboard
  { path: 'dashboard', component: AccountDashboardComponent }
  // You could potentially pass the selected environment via route params later:
  // { path: 'dashboard/:env', component: AccountDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

 * Implement Environment Selection Component
   * src/app/components/environment-selection/environment-selection.component.ts
     import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-environment-selection',
  templateUrl: './environment-selection.component.html',
  styleUrls: ['./environment-selection.component.css']
})
export class EnvironmentSelectionComponent {
  // Dummy environments
  environments: string[] = ['Development', 'Staging', 'Production', 'UAT'];

  // Inject Router in the constructor
  constructor(private router: Router) { }

  selectEnvironment(env: string): void {
    console.log(`Environment selected: ${env}`);
    // You could store the selected environment in a service if needed later
    // For now, just navigate to the dashboard
    this.router.navigate(['/dashboard']);
  }
}

   * src/app/components/environment-selection/environment-selection.component.html
     <div class="container">
  <h2>Select Environment</h2>
  <p>Please choose the environment you want to work with:</p>
  <div class="environment-buttons">
    <button *ngFor="let env of environments" (click)="selectEnvironment(env)">
      {{ env }}
    </button>
  </div>
</div>

   * src/app/components/environment-selection/environment-selection.component.css
     .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 50px auto;
  max-width: 400px;
  background-color: #f9f9f9;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

p {
  margin-bottom: 25px;
  color: #555;
}

.environment-buttons button {
  display: block; /* Make buttons stack vertically */
  width: 100%;    /* Make buttons fill container width */
  padding: 12px 20px;
  margin-bottom: 10px; /* Space between buttons */
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.environment-buttons button:last-child {
    margin-bottom: 0; /* No margin below the last button */
}

.environment-buttons button:hover {
  background-color: #0056b3;
}

 * Implement Account Dashboard Component
   * Import FormsModule in src/app/app.module.ts
     You need FormsModule to use [(ngModel)] for the search box.
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

   * src/app/components/account-dashboard/account-dashboard.component.ts
     import { Component, OnInit } from '@angular/core';

// Simple interface for an Account
interface Account {
  id: number;
  name: string;
}

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {
  searchTerm: string = '';
  allAccounts: Account[] = [];
  filteredAccounts: Account[] = [];

  ngOnInit(): void {
    // Load initial dummy account data
    this.loadAccounts();
  }

  loadAccounts(): void {
    // In a real app, you'd fetch this from a service/API
    this.allAccounts = [
      { id: 1, name: ' A' },
      { id: 2, name: 'B.' },
      { id: 3, name: 'C' },
      { id: 4, name: 'TD' },
      { id: 5, name: 'ONS' },
      { id: 6, name: 'S' },
      { id: 7, name: 'O' },
    ];
    this.filterAccounts(); // Initialize filtered list
  }

  filterAccounts(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredAccounts = [...this.allAccounts]; // Show all if search is empty
    } else {
      this.filteredAccounts = this.allAccounts.filter(account =>
        account.name.toLowerCase().includes(term)
      );
    }
  }

  addAccount(): void {
    // Placeholder for adding an account
    // In a real app, this would open a modal or navigate to a form
    const newAccountName = prompt('Enter new account name:');
    if (newAccountName?.trim()) {
        const newId = this.allAccounts.length > 0 ? Math.max(...this.allAccounts.map(a => a.id)) + 1 : 1;
        const newAccount: Account = { id: newId, name: newAccountName.trim() };
        this.allAccounts.push(newAccount);
        this.filterAccounts(); // Update the filtered list
        console.log('Account added:', newAccount);
    } else {
        console.log('Add account cancelled or empty name entered.');
    }
  }

  // Optional: Call filter directly when the model changes
  onSearchChange(): void {
    this.filterAccounts();
  }
}

   * src/app/components/account-dashboard/account-dashboard.component.html
     <div class="dashboard-container">
  <div class="header">
    <h1>Accounts ({{ filteredAccounts.length }})</h1>
    <div class="actions">
      <input
        type="text"
        placeholder="Search accounts by name"
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange()"
        class="search-input"
      />
      <button (click)="addAccount()" class="add-button">
        + Add Account
      </button>
    </div>
  </div>

  <ul class="account-list">
    <li *ngIf="filteredAccounts.length === 0 && searchTerm" class="no-results">
      No accounts found matching "{{ searchTerm }}".
    </li>
     <li *ngIf="filteredAccounts.length === 0 && !searchTerm" class="no-results">
      No accounts available.
    </li>
    <li *ngFor="let account of filteredAccounts">
      {{ account.name }}
      </li>
  </ul>
</div>

   * src/app/components/account-dashboard/account-dashboard.component.css
     .dashboard-container {
  padding: 20px;
  font-family: sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px; /* Space between search and button */
}

.search-input {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 250px; /* Give search some width */
}

.add-button {
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  background-color: #28a745; /* Green color */
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #218838;
}

.account-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.account-list li {
  padding: 12px 5px; /* Add padding for spacing */
  border-bottom: 1px solid #eee; /* Separator line */
  font-size: 16px;
  color: #444;
}

.account-list li:last-child {
  border-bottom: none; /* No line under the last item */
}

.no-results {
    color: #888;
    font-style: italic;
    text-align: center;
    padding: 20px;
}

 * Set up the Main App Component (src/app/app.component.html)
   Replace the default content with just the router outlet. This is where the routed components (Environment Selection or Dashboard) will be displayed.
   <router-outlet></router-outlet>

 * Run the Application
   ng serve -o

   This command builds the application and opens it in your default browser (usually at http://localhost:4200/).
How it Works:
 * When you open the app, the default route '' redirects to /select-environment.
 * The EnvironmentSelectionComponent is displayed, showing the dummy environment buttons.
 * Clicking an environment button calls selectEnvironment(), logs the choice, and uses the Router to navigate to the /dashboard route.
 * The AccountDashboardComponent is loaded.
 * ngOnInit fetches the dummy account list and displays it.
 * The search box uses [(ngModel)] to bind its value to the searchTerm property in the component. (ngModelChange) triggers the filtering immediately as you type.
 * The filterAccounts() method updates the filteredAccounts array based on the searchTerm.
 * *ngFor in the template loops through filteredAccounts to display the list.
 * The "Add Account" button calls the addAccount() method, which currently uses prompt to get a name and adds it to the list (this is very basic and would be replaced by a proper form/modal in a real app).
This provides the basic structure and functionality you requested: environment selection followed by a simplified dashboard with an account list, search, and add button.
