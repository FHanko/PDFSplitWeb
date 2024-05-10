import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PDFDocument } from 'pdf-lib';
import { Parser, ParseResult, SyntaxErr } from './pdf-tool-parser';
import { PDFUtil } from './pdf-util';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'pdf-tool',
  standalone: true,
  imports: [FormsModule, NgxExtendedPdfViewerModule],
  templateUrl: './pdf-tool.component.html',
  styleUrl: './pdf-tool.component.scss'
})
export class PdfToolComponent {
  getPDFs() {
    return PDFUtil.docs
  }

  removePDF(pdf: PDFDocument) {
    PDFUtil.docs = PDFUtil.docs.filter(p => p != pdf)
  }

  getError() {
    return PDFUtil.error
  }

  async onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement
    const fileList = target.files
    if (fileList == null) return

    for (let i = 0; i < fileList.length; i++) {
      let file = fileList.item(i)
      if (file == null) continue;
      let buffer = await file.arrayBuffer()
      let doc = await PDFDocument.load(buffer)
      doc.setCreationDate(new Date(Date.now()))
      doc.setTitle(file.name)
      PDFUtil.docs.push(doc)
    }
  }

  expression: string = ""
  parseErr: SyntaxErr[] = []

  async parseToDoc(): Promise<PDFDocument | undefined> {
    PDFUtil.error = ""
    const x = new Parser(this.expression)
    const result = x.parse()
    this.parseErr = result.errs
    return await result.ast?.doc
  }

  async download() {
    const bytes = await (await this.parseToDoc())?.save()
    if (bytes != undefined) this.downloadBlob(new Blob([bytes]))
  }

  previewSrc?: string
  async preview() {
    const b64 = await (await this.parseToDoc())?.saveAsBase64()
    this.previewSrc = b64
  }

  downloadBlob(blob: Blob, name = 'file.pdf') {
    const blobUrl = URL.createObjectURL(blob)
  
    const link = document.createElement("a")
  
    link.href = blobUrl
    link.download = name
  
    document.body.appendChild(link)
  
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
  
    document.body.removeChild(link)
  }
}
