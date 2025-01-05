import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: '<div #editorContainer class="monaco-editor"></div>',
  styles: [
    '.monaco-editor { width: 100%; height: 300px; border: 1px solid #ccc; }'
  ]
})
export class MonacoEditorComponent implements OnInit, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() code = '';
  @Input() language = 'plaintext';
  @Input() readOnly = false;
  @Output() codeChange = new EventEmitter<string>();

  private editor: monaco.editor.IStandaloneCodeEditor | null = null;

  ngOnInit() {
    this.initMonaco();
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  private initMonaco() {
    if (!this.editorContainer) {
      return;
    }

    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.code,
      language: this.language,
      theme: 'vs',
      readOnly: this.readOnly,
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on'
    });

    this.editor.onDidChangeModelContent(() => {
      if (this.editor) {
        const newValue = this.editor.getValue();
        this.code = newValue;
        this.codeChange.emit(newValue);
      }
    });
  }

  setValue(value: string) {
    if (this.editor) {
      this.editor.setValue(value);
    }
  }
}
