import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonacoEditorComponent } from '../shared/monaco-editor/monaco-editor.component';

@Component({
  selector: 'app-json-formatter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MonacoEditorComponent],
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent {
  jsonInput: string = '';
  jsonSchema: string = '';
  isValidJson: boolean = true;

  constructor(private snackBar: MatSnackBar) {}

  onJsonChange(value: string) {
    this.jsonInput = value;
    try {
      JSON.parse(value);
      this.isValidJson = true;
    } catch (e) {
      this.isValidJson = false;
    }
  }

  formatJson() {
    try {
      const parsed = JSON.parse(this.jsonInput);
      this.jsonInput = JSON.stringify(parsed, null, 2);
      this.snackBar.open('JSON formatted successfully', 'Close', { duration: 2000 });
    } catch (e) {
      this.snackBar.open('Invalid JSON', 'Close', { duration: 2000 });
    }
  }

  generateSchema() {
    try {
      const parsed = JSON.parse(this.jsonInput);
      this.jsonSchema = this.generateJsonSchema(parsed);
      this.snackBar.open('Schema generated successfully', 'Close', { duration: 2000 });
    } catch (e) {
      this.snackBar.open('Invalid JSON', 'Close', { duration: 2000 });
    }
  }

  private generateJsonSchema(json: any): string {
    const schema: any = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: this.getType(json)
    };

    if (schema.type === 'object') {
      schema.properties = {};
      for (const key in json) {
        schema.properties[key] = this.generateSchemaForValue(json[key]);
      }
    } else if (schema.type === 'array' && json.length > 0) {
      schema.items = this.generateSchemaForValue(json[0]);
    }

    return JSON.stringify(schema, null, 2);
  }

  private generateSchemaForValue(value: any): any {
    const type = this.getType(value);
    const schema: any = { type };

    if (type === 'object') {
      schema.properties = {};
      for (const key in value) {
        schema.properties[key] = this.generateSchemaForValue(value[key]);
      }
    } else if (type === 'array' && value.length > 0) {
      schema.items = this.generateSchemaForValue(value[0]);
    }

    return schema;
  }

  private getType(value: any): string {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    return typeof value;
  }
}
