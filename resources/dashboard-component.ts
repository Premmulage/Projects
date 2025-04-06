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
      { id: 1, name: 'CLAXTON HOBBS PHARMACY INC' },
      { id: 2, name: 'EVERWELL BENEFITS CO.' },
      { id: 3, name: 'AFLAC GROUP SERVICES' },
      { id: 4, name: 'GLOBAL INSURANCE LTD' },
      { id: 5, name: 'MEGA CORP SOLUTIONS' },
      { id: 6, name: 'SMALL BUSINESS ASSOCIATES' },
      { id: 7, name: 'TECH INNOVATORS LLC' },
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
