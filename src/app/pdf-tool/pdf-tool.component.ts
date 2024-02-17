import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'pdf-tool',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pdf-tool.component.html',
  styleUrl: './pdf-tool.component.scss'
})
export class PdfToolComponent {
  files: File[] = []

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const fileList = target.files;
    if (fileList == null) return;

    for (let i = 0; i < fileList.length; i++) {
      let file = fileList.item(i);
      if (file == null) continue; 
      this.files.push(file)
    }
  }

  expression: String = ""

  async generate() {
    const docs: PDFDocument[] = []
    for (const file of this.files) {
      let buffer = await file.arrayBuffer()
      docs.push(await PDFDocument.load(buffer))
    }

    
    console.debug(docs)
    console.debug(docs.length)

    for (let i = 1; i < docs.length; i++) {
      let copied = await docs[0].copyPages(docs[i], docs[i].getPageIndices())
      for (let page of copied) {
        docs[0].addPage(page)
      }
    }
    
    const bytes = docs[0]?.save()
    bytes.then(b => this.downloadBlob(new Blob([new Uint8Array(b)])))
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
