import { PDFDocument } from 'pdf-lib';

export class PDFUtil {
  static docs: PDFDocument[] = []
  static error: string = ""
  
  static async pickPages(doc: Promise<PDFDocument>, indices: number[]): Promise<PDFDocument> {
    let pdf = await doc
    let pages = await pdf.copyPages(pdf, indices.map(i => i - 1))
    let count = pdf.getPageCount();
    for (let i=0; i < count; i++) {
      pdf.removePage(0);
    }
    for (let page of pages) {
      pdf.addPage(page);
    }
    return pdf;
  }

  static async concat(docLeft: Promise<PDFDocument>, docRight: Promise<PDFDocument>): Promise<PDFDocument> {
    let left = await docLeft;
    let right = await docRight;
    let pages = await left.copyPages(right, right.getPageIndices())
    for (let page of pages) {
        left.addPage(page);
    }
    return left;
  }

  static async identity(id: number): Promise<PDFDocument> {
    if (id < 1 || id > PDFUtil.docs.length) this.error = `PDF index ${id} is not valid.`
    return PDFUtil.docs[id-1].copy();
  }
}