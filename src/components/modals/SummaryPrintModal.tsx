'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { formatCurrency, formatDate, calculateSubtotal, calculateDiscountAmount, calculateTotal } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';
import { Printer, X, FileText, QrCode, CheckCircle, Copy, Check } from 'lucide-react';

interface SummaryPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SummaryPrintModal: React.FC<SummaryPrintModalProps> = ({ isOpen, onClose }) => {
  const { proposal } = useProposal();
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const subtotal = calculateSubtotal(proposal.items);
  const discountAmount = calculateDiscountAmount(
    subtotal,
    proposal.discount,
    proposal.discountType
  );
  const grandTotal = calculateTotal(subtotal, discountAmount);

  const handlePrintSummary = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `📄 RESUMO DA PROPOSTA COMERCIAL #${proposal.proposalNumber}
---------------------------------------------
PROJETO: ${proposal.title || 'Prestação de Serviços'}
PRESTADOR: ${proposal.provider.name}
CLIENTE: ${proposal.client.name} ${proposal.client.companyName ? `(${proposal.client.companyName})` : ''}
DATA: ${formatDate(proposal.issueDate)} | VALIDADE: ${proposal.conditions.validityDays} dias

ITENS E VALORES:
${proposal.items.map((i, idx) => `${idx + 1}. ${i.description}: ${i.quantity}x ${formatCurrency(i.unitPrice, proposal.currency)} = ${formatCurrency(i.quantity * i.unitPrice, proposal.currency)}`).join('\n')}

SUBTOTAL: ${formatCurrency(subtotal, proposal.currency)}
${discountAmount > 0 ? `DESCONTO: - ${formatCurrency(discountAmount, proposal.currency)}\n` : ''}TOTAL GERAL: ${formatCurrency(grandTotal, proposal.currency)}

CONDIÇÕES:
• Prazo de entrega: ${proposal.conditions.deliveryTime}
• Pagamento: ${proposal.conditions.paymentMethod}
${proposal.provider.pixKey ? `• Chave PIX: ${proposal.provider.pixKey}\n` : ''}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors print:hidden"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 print:hidden">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Resumo Comercial da Proposta
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formato sintético ideal para conferência rápida, impressão em 1 página ou envio
            </p>
          </div>
        </div>

        {/* Printable Summary Sheet */}
        <div
          id="printable-summary-content"
          className="overflow-y-auto p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-4"
        >
          {/* Top Info */}
          <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Resumo Executivo
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {proposal.title || 'Proposta de Prestação de Serviços'}
              </h4>
              <p className="text-slate-500 mt-0.5">
                Emitente: <span className="font-semibold text-slate-700 dark:text-slate-300">{proposal.provider.name}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900 dark:text-white block">
                #{proposal.proposalNumber}
              </span>
              <span className="text-slate-500 text-[11px]">
                {formatDate(proposal.issueDate)}
              </span>
            </div>
          </div>

          {/* Client summary */}
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Cliente
            </span>
            <div className="font-bold text-slate-900 dark:text-slate-100">
              {proposal.client.name || 'Cliente'}
              {proposal.client.companyName ? ` • ${proposal.client.companyName}` : ''}
            </div>
            {(proposal.client.phone || proposal.client.email) && (
              <div className="text-slate-500 text-[11px] mt-0.5">
                {proposal.client.phone} {proposal.client.phone && proposal.client.email ? '•' : ''} {proposal.client.email}
              </div>
            )}
          </div>

          {/* Items condensed table */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Itens do Orçamento
            </span>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">
                    <th className="py-2 px-3">Item / Serviço</th>
                    <th className="py-2 px-3 text-center w-12">Qtd</th>
                    <th className="py-2 px-3 text-right w-24">Unitário</th>
                    <th className="py-2 px-3 text-right w-24">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {proposal.items.map((item, idx) => (
                    <tr key={item.id || idx}>
                      <td className="py-2 px-3 font-medium text-slate-800 dark:text-slate-200">
                        {item.description || 'Item'}
                      </td>
                      <td className="py-2 px-3 text-center text-slate-600">{item.quantity}</td>
                      <td className="py-2 px-3 text-right text-slate-600">
                        {formatCurrency(item.unitPrice, proposal.currency)}
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-slate-900 dark:text-white">
                        {formatCurrency(item.quantity * item.unitPrice, proposal.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Banner */}
          <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
            <div>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 block">
                Subtotal: {formatCurrency(subtotal, proposal.currency)}
                {discountAmount > 0 && ` (Desconto: -${formatCurrency(discountAmount, proposal.currency)})`}
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Valor Total da Proposta:
              </span>
            </div>
            <span className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400">
              {formatCurrency(grandTotal, proposal.currency)}
            </span>
          </div>

          {/* Conditions & PIX quick info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Prazo:</span>{' '}
              {proposal.conditions.deliveryTime}
            </div>
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Validade:</span>{' '}
              {proposal.conditions.validityDays} dias
            </div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Pagamento:</span>{' '}
              {proposal.conditions.paymentMethod}
            </div>
            {proposal.provider.pixKey && (
              <div className="sm:col-span-2 flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                <QrCode size={13} />
                <span>Chave PIX: {proposal.provider.pixKey}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            onClick={handleCopyText}
          >
            {copied ? 'Copiado para Área de Transferência!' : 'Copiar Texto para WhatsApp'}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Fechar
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              icon={<Printer size={15} />}
              onClick={handlePrintSummary}
              className="bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              Imprimir Resumo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
