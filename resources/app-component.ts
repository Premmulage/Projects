import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnvironmentService } from './services/environment.service'; // <-- Import service
import { Subscription } from 'rxjs'; // <-- Import Subscription

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy { // <-- Implement interfaces
  title = 'simplified-account-dashboard';
  selectedEnvironment: string | null = null;
  private environmentSubscription: Subscription | undefined; // <-- To manage subscription

  // Inject the service
  constructor(private environmentService: EnvironmentService) {}

  ngOnInit(): void {
    // Subscribe to the observable from the service
    this.environmentSubscription = this.environmentService.selectedEnvironment$.subscribe(env => {
      this.selectedEnvironment = env; // Update local property when service emits
    });
  }

  ngOnDestroy(): void {
    // IMPORTANT: Unsubscribe when the component is destroyed to prevent memory leaks
    this.environmentSubscription?.unsubscribe();
  }
}
