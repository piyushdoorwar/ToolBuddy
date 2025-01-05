import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private overlayContainer = inject(OverlayContainer);
  isDarkTheme = false;

  devTools = [
    { path: '/dev/color-picker', name: 'Color Picker', icon: 'palette' },
    { path: '/dev/json-formatter', name: 'JSON Formatter', icon: 'code' },
    { path: '/dev/sql-formatter', name: 'SQL Formatter', icon: 'storage' },
    { path: '/dev/xml-converter', name: 'XML to JSON', icon: 'transform' }
  ];

  financeTools = [
    { path: '/finance/emi-calculator', name: 'EMI Calculator', icon: 'calculate' },
    { path: '/finance/loan-payoff', name: 'Loan Payoff', icon: 'payments' },
    { path: '/finance/tax-calculator', name: 'Tax Calculator', icon: 'account_balance' }
  ];

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      document.body.classList.add('dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      document.body.classList.remove('dark-theme');
    }
  }
}
