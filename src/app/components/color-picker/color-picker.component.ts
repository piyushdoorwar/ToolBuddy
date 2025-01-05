import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule
  ],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  red = 128;
  green = 128;
  blue = 128;
  alpha = 1;
  hexColor = '#808080';

  updateColor() {
    this.hexColor = '#' + 
      this.componentToHex(this.red) + 
      this.componentToHex(this.green) + 
      this.componentToHex(this.blue);
  }

  updateFromHex() {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hexColor);
    if (result) {
      this.red = parseInt(result[1], 16);
      this.green = parseInt(result[2], 16);
      this.blue = parseInt(result[3], 16);
    }
  }

  private componentToHex(c: number): string {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  get rgbaColor(): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}
