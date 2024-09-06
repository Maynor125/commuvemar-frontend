declare module 'html2pdf.js' {
    interface Html2Pdf {
      (element: HTMLElement, options?: any): void;
    }
    const html2pdf: Html2Pdf;
    export default html2pdf;
 }
  