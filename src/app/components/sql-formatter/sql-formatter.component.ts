import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { format } from 'sql-formatter';

interface Language {
  name: string;
  value: 'sql' | 'mysql' | 'postgresql' | 'tsql' | 'plsql' | 'bigquery';
}

@Component({
  selector: 'app-sql-formatter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './sql-formatter.component.html',
  styleUrls: ['./sql-formatter.component.scss']
})
export class SqlFormatterComponent {
  input = '';
  output = '';
  language: Language['value'] = 'sql';

  languages: Language[] = [
    { name: 'Standard SQL', value: 'sql' },
    { name: 'MySQL', value: 'mysql' },
    { name: 'PostgreSQL', value: 'postgresql' },
    { name: 'T-SQL', value: 'tsql' },
    { name: 'PL/SQL', value: 'plsql' },
    { name: 'BigQuery', value: 'bigquery' }
  ];

  formatSQL() {
    try {
      this.output = format(this.input, {
        language: this.language
      });
    } catch (error) {
      this.output = 'Error formatting SQL: ' + (error as Error).message;
    }
  }

  trackByLang(index: number, lang: Language): string {
    return lang.value;
  }
}
