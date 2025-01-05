import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'dev',
    children: [
      {
        path: 'color-picker',
        loadComponent: () => import('./components/color-picker/color-picker.component').then(m => m.ColorPickerComponent)
      },
      {
        path: 'json-formatter',
        loadComponent: () => import('./components/json-formatter/json-formatter.component').then(m => m.JsonFormatterComponent)
      },
      {
        path: 'sql-formatter',
        loadComponent: () => import('./components/sql-formatter/sql-formatter.component').then(m => m.SqlFormatterComponent)
      },
      {
        path: 'xml-converter',
        loadComponent: () => import('./components/xml-converter/xml-converter.component').then(m => m.XmlConverterComponent)
      }
    ]
  },
  {
    path: 'finance',
    children: [
      {
        path: 'emi-calculator',
        loadComponent: () => import('./components/emi-calculator/emi-calculator.component').then(m => m.EmiCalculatorComponent)
      },
      {
        path: 'loan-payoff',
        loadComponent: () => import('./components/loan-payoff/loan-payoff.component').then(m => m.LoanPayoffComponent)
      },
      {
        path: 'tax-calculator',
        loadComponent: () => import('./components/tax-calculator/tax-calculator.component').then(m => m.TaxCalculatorComponent)
      }
    ]
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
