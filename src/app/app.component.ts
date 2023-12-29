import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <a routerLink="/entities">Entities</a>&nbsp;
    <a routerLink="/signalstore">SignalStore</a>&nbsp;
    <a routerLink="/signalstore-feature">SignalStoreFeature</a>&nbsp;
    <a routerLink="/rxjs-integration">RxJSIntegration</a>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ng-signals-with-ngrx-entities';
}
