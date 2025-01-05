import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MonacoEditorComponent } from '../shared/monaco-editor/monaco-editor.component';

interface Match {
  text: string;
  index: number;
  groups: string[];
}

@Component({
  selector: 'app-regex-tester',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MonacoEditorComponent
  ],
  templateUrl: './regex-tester.component.html',
  styleUrls: ['./regex-tester.component.scss']
})
export class RegexTesterComponent {
  pattern: string = '';
  testString: string = '';
  flags: string = 'g';
  matches: Match[] = [];
  isValid: boolean = true;

  // Regex flags
  global: boolean = true;
  caseInsensitive: boolean = false;
  multiline: boolean = false;
  dotAll: boolean = false;
  unicode: boolean = false;
  sticky: boolean = false;

  updateFlags() {
    this.flags = '';
    if (this.global) this.flags += 'g';
    if (this.caseInsensitive) this.flags += 'i';
    if (this.multiline) this.flags += 'm';
    if (this.dotAll) this.flags += 's';
    if (this.unicode) this.flags += 'u';
    if (this.sticky) this.flags += 'y';
    this.test();
  }

  test() {
    this.matches = [];
    if (!this.pattern || !this.testString) return;

    try {
      const regex = new RegExp(this.pattern, this.flags);
      this.isValid = true;
      let match;

      while ((match = regex.exec(this.testString)) !== null) {
        this.matches.push({
          text: match[0],
          index: match.index,
          groups: match.slice(1)
        });

        if (!this.global) break;
      }
    } catch (e) {
      this.isValid = false;
    }
  }
}
