import React from 'react';
import type { DocumentProps } from '@react-pdf/renderer';
import { ProposalData } from '@/types/proposal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateAndDownloadPdf(proposal: ProposalData): Promise<void> {
  // Format clean client name for filename
  const rawClientName = proposal.client.name || 'Cliente';
  const cleanClientName = rawClientName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-zA-Z0-9_-]/g, '_') // replace spaces and special chars
    .replace(/_+/g, '_');

  const filename = `Proposta_${cleanClientName}.pdf`;

  // Attempt 1: Vector PDF generation via @react-pdf/renderer
  try {
    const { pdf } = await import('@react-pdf/renderer');
    const { ProposalPdfDocument } = await import('@/components/pdf/ProposalPdfDocument');

    const doc = React.createElement(ProposalPdfDocument, { proposal }) as React.ReactElement<DocumentProps>;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return;
  } catch (vectorError) {
    console.warn('Vector PDF generation encountered an issue, trying high-res canvas fallback...', vectorError);
  }

  // Attempt 2: High-resolution HTML2Canvas + jsPDF fallback
  try {
    const element = document.getElementById('proposal-document');
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdfDoc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdfDoc.internal.pageSize.getWidth();
      const pdfHeight = pdfDoc.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      let imgHeight = pdfWidth / ratio;
      let heightLeft = imgHeight;
      let position = 0;

      pdfDoc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdfDoc.addPage();
        pdfDoc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      pdfDoc.save(filename);
      return;
    }
  } catch (canvasError) {
    console.warn('Canvas PDF fallback failed, opening browser print dialog...', canvasError);
  }

  // Attempt 3: Browser print dialog fallback
  window.print();
}

export async function exportProposalToPdf(elementId: string, filename?: string) {
  window.print();
}
