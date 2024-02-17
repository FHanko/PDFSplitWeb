import { PDFDocument } from 'pdf-lib';

export class PDFUtil {
  static docs: PDFDocument[] = []
  static error: string = ""
  
  static async pickPagesCollapse(docs: Promise<PDFDocument>[], indices: number[]): Promise<PDFDocument> {
    let collapsable: Promise<PDFDocument>[] = []
    for (let doc of docs) {
      collapsable.push(this.pickPages(doc, indices))
    }
    return this.collapse(collapsable);
  }

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

  static async collapse(docs: Promise<PDFDocument>[]): Promise<PDFDocument> {
    for (let i = 1; i < docs.length; i++) {
      PDFUtil.concat(docs[0], docs[i]);
    }
    return docs[0];
  }

  static async identity(id: number): Promise<PDFDocument> {
    if (id < 1 || id > PDFUtil.docs.length) this.error = `PDF index ${id} is not valid.`
    return PDFUtil.docs[id-1].copy();
  }

  static range(from: number, to: number) {
    let size = ((from > to) ? from - to : to - from) + 1;
    if (from > to) return [...Array(size).keys()].map(i => i + to).reverse();
    else return [...Array(size).keys()].map(i => i + from);
  }
}