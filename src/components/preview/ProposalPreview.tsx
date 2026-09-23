'use client';

import React, { useState } from 'react';
import { DocumentA4 } from './DocumentA4';
import { Button } from '@/components/ui/Button';
import { generateAndDownloadPdf } from '@/lib/pdfGenerator';
import { useProposal } from '@/context/ProposalContext';
import { useLicense } from '@/context/LicenseContext';
import { Download, Printer, ZoomIn, ZoomOut, RotateCcw, Copy, Check, FileText } from 'lucide-react';
import { formatCurrency, calculateSubtotal, calculateDiscountAmount, calculateTotal } from '@/lib/formatters';

export const ProposalPreview: React.FC = () => {
  const { proposal } = useProposal();
  const { setIsSummaryOpen } = useLicense();
  const [isExporting, setIsExporting] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await generateAndDownloadPdf(proposal);
    } catch (error) {
      console.error('PDF generation error:', error);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrintFull = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const subtotal = calculateSubtotal(proposal.items);
    const discountAmount = calculateDiscountAmount(subtotal, proposal.discount, proposal.discountType);
    const total = calculateTotal(subtotal, discountAmount);

    const summary = `📄 *PROPOSTA COMERCIAL: ${proposal.title || 'Prestação de Serviços'}*
• Proposta: #${proposal.proposalNumber}
• Emitente: ${proposal.provider.name}
• Cliente: ${proposal.client.name} ${proposal.client.companyName ? `(${proposal.client.companyName})` : ''}
• Itens Orçados: ${proposal.items.map((i) => `\n  - ${i.description || 'Item'}: ${i.quantity}x ${formatCurrency(i.unitPrice, proposal.currency)}`).join('')}
• Total: ${formatCurrency(total, proposal.currency)}
• Prazo de Execução: ${proposal.conditions.deliveryTime}
• Forma de Pagamento: ${proposal.conditions.paymentMethod}${proposal.provider.pixKey ? `\n• Chave PIX: ${proposal.provider.pixKey}` : ''}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const clientFileName = proposal.client.name
    ? `Proposta_${proposal.client.name.replace(/\s+/g, '_')}.pdf`
    : 'Proposta_Cliente.pdf';

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm print:hidden">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.1).toFixed(1))))}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title="Reduzir zoom"
          >
            <ZoomOut size={15} />
          </button>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 w-11 text-center select-none">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.4, Number((z + 0.1).toFixed(1))))}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title="Aumentar zoom"
          >
            <ZoomIn size={15} />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors"
            title="Restaurar zoom"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Imprimir Resumo Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<FileText size={14} className="text-blue-600 dark:text-blue-400" />}
            onClick={() => setIsSummaryOpen(true)}
            title="Visualizar e Imprimir Resumo Comercial de 1 página"
            className="font-medium bg-blue-50/50 hover:bg-blue-50 dark:bg-blue-950/30 dark:hover:bg-blue-950/60 border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300"
          >
            Imprimir Resumo
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            onClick={handleCopySummary}
            title="Copiar resumo para WhatsApp"
          >
            <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<Printer size={14} />}
            onClick={handlePrintFull}
            title="Imprimir proposta A4 completa"
          >
            <span className="hidden md:inline">Imprimir</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            icon={isExporting ? undefined : <Download size={14} />}
            isLoading={isExporting}
            onClick={handleExportPdf}
            title={`Baixar arquivo '${clientFileName}'`}
            className="bg-blue-600 hover:bg-blue-700 font-bold shadow-sm"
          >
            Baixar PDF
          </Button>
        </div>
      </div>

      {/* Live Preview Viewport Container */}
      <div className="flex-1 overflow-auto rounded-2xl bg-slate-100 dark:bg-slate-950/80 p-4 sm:p-8 flex justify-center items-start border border-slate-200/80 dark:border-slate-800/80 min-h-[600px]">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full flex justify-center"
        >
          <DocumentA4 />
        </div>
      </div>
    </div>
  );
};
