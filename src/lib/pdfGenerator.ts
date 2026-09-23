import React from 'react';
import type { DocumentProps } from '@react-pdf/renderer';
import { ProposalData } from '@/types/proposal';

export async function generateAndDownloadPdf(proposal: ProposalData): Promise<void> {
  // Format clean client name for filename
  const rawClientName = proposal.client.name || 'Cliente';
  const cleanClientName = rawClientName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-zA-Z0-9_-]/g, '_') // replace spaces and special chars
    .replace(/_+/g, '_');

  const filename = `Proposta_${cleanClientName}.pdf`;

  try {
    // Dynamic import to prevent SSR/prerender node-canvas & react-pdf conflicts
    const { pdf } = await import('@react-pdf/renderer');
    const { ProposalPdfDocument } = await import('@/components/pdf/ProposalPdfDocument');

    const doc = React.createElement(ProposalPdfDocument, { proposal }) as React.ReactElement<DocumentProps>;
    const asPdf = pdf(doc);
    const blob = await asPdf.toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to generate vector PDF via @react-pdf/renderer', error);
    throw error;
  }
}

// Fallback alias
export async function exportProposalToPdf(elementId: string, filename?: string) {
  window.print();
}
