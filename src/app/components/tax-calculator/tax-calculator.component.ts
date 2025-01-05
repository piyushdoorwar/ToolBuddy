import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface TaxBracket {
  rate: number;
  threshold: number;
}

interface TaxBrackets {
  [year: number]: TaxBracket[];
}

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.scss']
})
export class TaxCalculatorComponent {
  income = 0;
  taxYear = 2024;
  taxableIncome = 0;
  totalTax = 0;
  effectiveRate = 0;

  taxBrackets: TaxBrackets = {
    2024: [
      { rate: 0.1, threshold: 11600 },
      { rate: 0.12, threshold: 47150 },
      { rate: 0.22, threshold: 100525 },
      { rate: 0.24, threshold: 191950 },
      { rate: 0.32, threshold: 243725 },
      { rate: 0.35, threshold: 609350 },
      { rate: 0.37, threshold: Infinity }
    ]
  };

  calculateTax() {
    if (this.income <= 0) {
      this.resetCalculations();
      return;
    }

    this.taxableIncome = this.income;
    let remainingIncome = this.taxableIncome;
    let totalTax = 0;
    let previousThreshold = 0;

    for (const bracket of this.taxBrackets[this.taxYear]) {
      const taxableAmount = Math.min(
        remainingIncome,
        bracket.threshold - previousThreshold
      );
      
      if (taxableAmount <= 0) break;

      totalTax += taxableAmount * bracket.rate;
      remainingIncome -= taxableAmount;
      previousThreshold = bracket.threshold;

      if (remainingIncome <= 0) break;
    }

    this.totalTax = Math.round(totalTax * 100) / 100;
    this.effectiveRate = Math.round((this.totalTax / this.taxableIncome) * 10000) / 100;
  }

  private resetCalculations() {
    this.taxableIncome = 0;
    this.totalTax = 0;
    this.effectiveRate = 0;
  }
}
