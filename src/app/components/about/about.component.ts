import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  version = '1.0.0';
  description = 'ToolBuddy is a collection of useful developer and finance tools to help streamline your workflow.';
  features = [
    'Developer Tools - JSON Formatter, SQL Formatter, XML Converter, Color Picker',
    'Finance Tools - EMI Calculator, Loan Payoff Calculator, Tax Calculator',
    'Modern UI with Dark/Light theme support',
    'Responsive design for all devices'
  ];
}
