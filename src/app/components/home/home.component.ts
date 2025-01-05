import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

interface Tool {
  name: string;
  description: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  devTools: Tool[] = [
    {
      name: 'Color Picker',
      description: 'Pick and convert colors between different formats',
      route: '/dev/color-picker',
      icon: 'palette'
    },
    {
      name: 'JSON Formatter',
      description: 'Format, validate and beautify JSON data',
      route: '/dev/json-formatter',
      icon: 'code'
    },
    {
      name: 'SQL Formatter',
      description: 'Format and beautify SQL queries',
      route: '/dev/sql-formatter',
      icon: 'storage'
    },
    {
      name: 'XML to JSON',
      description: 'Convert between XML and JSON formats',
      route: '/dev/xml-converter',
      icon: 'transform'
    }
  ];

  financeTools: Tool[] = [
    {
      name: 'EMI Calculator',
      description: 'Calculate EMI for loans with detailed breakup',
      route: '/finance/emi-calculator',
      icon: 'calculate'
    },
    {
      name: 'Loan Payoff',
      description: 'Calculate loan payoff with extra payments',
      route: '/finance/loan-payoff',
      icon: 'payments'
    },
    {
      name: 'Tax Calculator',
      description: 'Compare taxes under old and new regimes',
      route: '/finance/tax-calculator',
      icon: 'account_balance'
    }
  ];
}
