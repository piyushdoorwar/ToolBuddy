import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { parseString, Builder } from 'xml2js';

@Component({
  selector: 'app-xml-converter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './xml-converter.component.html',
  styleUrls: ['./xml-converter.component.scss']
})
export class XmlConverterComponent {
  input = '';
  output = '';

  convertToJson() {
    if (!this.input.trim()) {
      this.output = '';
      return;
    }

    parseString(this.input, (error, result) => {
      if (error) {
        this.output = 'Error converting XML to JSON: ' + error.message;
        return;
      }
      try {
        this.output = JSON.stringify(result, null, 2);
      } catch (error) {
        this.output = 'Error converting XML to JSON: ' + (error as Error).message;
      }
    });
  }

  convertToXml() {
    if (!this.input.trim()) {
      this.output = '';
      return;
    }

    try {
      const jsonObj = JSON.parse(this.input);
      const builder = new Builder();
      this.output = builder.buildObject(jsonObj);
    } catch (error) {
      this.output = 'Error converting JSON to XML: ' + (error as Error).message;
    }
  }
}
