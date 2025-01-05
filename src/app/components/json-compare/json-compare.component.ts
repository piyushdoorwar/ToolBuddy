import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MonacoEditorComponent } from '../shared/monaco-editor/monaco-editor.component';

@Component({
  selector: 'app-json-compare',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MonacoEditorComponent
  ],
  templateUrl: './json-compare.component.html',
  styleUrls: ['./json-compare.component.scss']
})
export class JsonCompareComponent {
  jsonA: string = '';
  jsonB: string = '';
  highlightDiff: boolean = true;
  comparisonResult: string = '';

  compareJson() {
    try {
      const objA = JSON.parse(this.jsonA);
      const objB = JSON.parse(this.jsonB);
      
      const diff = this.findDifferences(objA, objB);
      this.comparisonResult = JSON.stringify(diff, null, 2);
    } catch (e) {
      this.comparisonResult = 'Invalid JSON in one or both inputs';
    }
  }

  private findDifferences(objA: any, objB: any, path: string = ''): any {
    if (objA === objB) return undefined;

    if (typeof objA !== typeof objB) {
      return {
        type: 'changed',
        oldValue: objA,
        newValue: objB,
        path
      };
    }

    if (Array.isArray(objA) && Array.isArray(objB)) {
      const diffs = [];
      const maxLength = Math.max(objA.length, objB.length);

      for (let i = 0; i < maxLength; i++) {
        const itemPath = path ? `${path}[${i}]` : `[${i}]`;
        if (i >= objA.length) {
          diffs.push({
            type: 'added',
            value: objB[i],
            path: itemPath
          });
        } else if (i >= objB.length) {
          diffs.push({
            type: 'removed',
            value: objA[i],
            path: itemPath
          });
        } else {
          const diff = this.findDifferences(objA[i], objB[i], itemPath);
          if (diff) diffs.push(diff);
        }
      }

      return diffs.length ? diffs : undefined;
    }

    if (typeof objA === 'object' && objA !== null && typeof objB === 'object' && objB !== null) {
      const diffs = {};
      const allKeys = new Set([...Object.keys(objA), ...Object.keys(objB)]);

      for (const key of allKeys) {
        const keyPath = path ? `${path}.${key}` : key;
        if (!(key in objA)) {
          diffs[key] = {
            type: 'added',
            value: objB[key],
            path: keyPath
          };
        } else if (!(key in objB)) {
          diffs[key] = {
            type: 'removed',
            value: objA[key],
            path: keyPath
          };
        } else {
          const diff = this.findDifferences(objA[key], objB[key], keyPath);
          if (diff) diffs[key] = diff;
        }
      }

      return Object.keys(diffs).length ? diffs : undefined;
    }

    return {
      type: 'changed',
      oldValue: objA,
      newValue: objB,
      path
    };
  }
}
