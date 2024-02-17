import { PDFDocument } from 'pdf-lib';

export class PDFUtil {
  static docs: PDFDocument[] = []
  
  static concat(left: PDFDocument, right: PDFDocument): PDFDocument {
    left.copyPages(right, right.getPageIndices()).then(pages => {
      for (let page of pages) {
        left.addPage(page)
      }
    }).catch(e => { throw new Error("Error on concat " + e) })
    return left;
  }

  static identity(id: number): PDFDocument {
    return PDFUtil.docs[id]
  }
}