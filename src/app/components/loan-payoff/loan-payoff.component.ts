import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-loan-payoff',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './loan-payoff.component.html',
  styleUrls: ['./loan-payoff.component.scss']
})
export class LoanPayoffComponent {

  loanAmount = 100000;
  interestRate = 10;
  monthlyPayment = 1000;
  extraPayment = 0;
  payoffTime = 0;
  totalInterest = 0;
  savings = 0;
  chart: Chart | null = null;

  calculatePayoff() {
    let balance = this.loanAmount;
    let months = 0;
    let totalInterest = 0;
    const monthlyRate = this.interestRate / 12 / 100;
    const payment = this.monthlyPayment + this.extraPayment;

    while (balance > 0 && months < 360) { // 30 years max
      const interest = balance * monthlyRate;
      totalInterest += interest;
      
      balance = balance + interest - payment;
      months++;

      if (balance < payment) {
        totalInterest += balance * monthlyRate;
        balance = 0;
        months++;
      }
    }

    this.payoffTime = months;
    this.totalInterest = Math.round(totalInterest);

    // Calculate savings compared to minimum payment
    const minPayment = (this.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, 360)) / 
                      (Math.pow(1 + monthlyRate, 360) - 1);
    const totalWithMin = minPayment * 360;
    this.savings = Math.round(totalWithMin - (this.payoffTime * payment));

    this.updateChart();
  }

  private updateChart() {
    const ctx = document.getElementById('payoffChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest', 'Savings'],
        datasets: [{
          data: [this.loanAmount, this.totalInterest, this.savings],
          backgroundColor: ['#4CAF50', '#F44336', '#2196F3']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}
