import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-emi-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.scss']
})
export class EmiCalculatorComponent {

  loanAmount = 100000;
  interestRate = 10;
  loanTerm = 12;
  emi = 0;
  totalInterest = 0;
  totalPayment = 0;
  chart: Chart | null = null;

  calculateEMI() {
    const principal = this.loanAmount;
    const rate = this.interestRate / 12 / 100;
    const time = this.loanTerm;

    this.emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    this.totalPayment = this.emi * time;
    this.totalInterest = this.totalPayment - principal;

    this.updateChart();
  }

  private updateChart() {
    const ctx = document.getElementById('emiChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal', 'Interest'],
        datasets: [{
          data: [this.loanAmount, this.totalInterest],
          backgroundColor: ['#4CAF50', '#F44336']
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
