import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PDFDocument } from 'pdf-lib';
import { Parser, ParseResult, SyntaxErr } from './pdf-tool-parser';
import { PDFUtil } from './pdf-util';

@Component({
  selector: 'pdf-tool',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pdf-tool.component.html',
  styleUrl: './pdf-tool.component.scss'
})
export class PdfToolComponent {
  getPDFs() {
    return PDFUtil.docs;
  }

  getError() {
    return PDFUtil.error;
  }

  async onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const fileList = target.files;
    if (fileList == null) return;

    for (let i = 0; i < fileList.length; i++) {
      let file = fileList.item(i);
      if (file == null) continue;
      let buffer = await file.arrayBuffer()
      let doc = await PDFDocument.load(buffer)
      doc.setTitle(file.name)
      PDFUtil.docs.push(doc)
    }
  }

  expression: string = ""
  parseErr: SyntaxErr[] = []

  async generate() {
    PDFUtil.error = "";
    let x = new Parser(this.expression)
    let result = x.parse()
    this.parseErr = result.errs

    const bytes = await (await result.ast?.doc)?.save()
    if (bytes == null) return;
    this.downloadBlob(new Blob([new Uint8Array(bytes)]))
  }

  downloadBlob(blob: Blob, name = 'file.pdf') {
    const blobUrl = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
  
    link.href = blobUrl;
    link.download = name;
  
    document.body.appendChild(link);
  
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
  
    document.body.removeChild(link);
  }
}
