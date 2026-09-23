'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import {
  formatCurrency,
  formatDate,
  calculateSubtotal,
  calculateDiscountAmount,
  calculateTotal,
} from '@/lib/formatters';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle2,
  Clock,
  CreditCard,
  Calendar,
  QrCode,
  Award,
  AlertCircle,
  Milestone,
} from 'lucide-react';

export const DocumentA4: React.FC = () => {
  const { proposal } = useProposal();

  const isMinimalist = proposal.theme === 'minimalist';
  const primaryColor = isMinimalist
    ? '#09090b'
    : proposal.provider.primaryColor || '#1e3a8a';

  const subtotal = calculateSubtotal(proposal.items);
  const discountAmount = calculateDiscountAmount(
    subtotal,
    proposal.discount,
    proposal.discountType
  );
  const grandTotal = calculateTotal(subtotal, discountAmount);

  return (
    <div
      id="proposal-document"
      className={`bg-white text-slate-800 w-full min-h-[1123px] max-w-[794px] mx-auto p-8 sm:p-12 shadow-2xl rounded-sm flex flex-col justify-between print:shadow-none print:p-8 print:max-w-full print:m-0 transition-all ${
        isMinimalist ? 'font-sans border-t-8 border-zinc-900' : 'font-sans'
      }`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      <div>
        {/* Top Accent Line (Corporate) */}
        {!isMinimalist && (
          <div
            className="h-2 w-full rounded-full mb-8"
            style={{ backgroundColor: primaryColor }}
          />
        )}

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-3 max-w-[60%]">
            {proposal.provider.logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={proposal.provider.logo}
                alt="Logo Prestador"
                className="max-h-16 max-w-[200px] object-contain"
              />
            ) : (
              <div
                className={`text-2xl font-black tracking-tight ${
                  isMinimalist ? 'text-zinc-950 uppercase tracking-widest' : ''
                }`}
                style={{ color: isMinimalist ? '#09090b' : primaryColor }}
              >
                {proposal.provider.name || 'Nome do Prestador'}
              </div>
            )}

            {proposal.provider.logo && (
              <h2 className="text-lg font-bold text-slate-900">
                {proposal.provider.name || 'Nome do Prestador'}
              </h2>
            )}

            <div className="text-xs text-slate-600 space-y-1">
              {proposal.provider.document && (
                <div>
                  <span className="font-medium text-slate-800">CNPJ/CPF:</span>{' '}
                  {proposal.provider.document}
                </div>
              )}
              {proposal.provider.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="shrink-0 text-slate-400" />
                  <span>{proposal.provider.address}</span>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {proposal.provider.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} className="shrink-0 text-slate-400" />
                    <span>{proposal.provider.email}</span>
                  </div>
                )}
                {proposal.provider.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} className="shrink-0 text-slate-400" />
                    <span>{proposal.provider.phone}</span>
                  </div>
                )}
                {proposal.provider.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe size={12} className="shrink-0 text-slate-400" />
                    <span>{proposal.provider.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Proposal Meta Badge */}
          <div
            className={`text-right sm:self-start p-4 rounded-xl min-w-[200px] border ${
              isMinimalist
                ? 'bg-zinc-50 border-zinc-200'
                : 'bg-slate-50 border-slate-100'
            }`}
          >
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                isMinimalist ? 'bg-zinc-900 text-white' : ''
              }`}
              style={{
                backgroundColor: isMinimalist ? '#09090b' : `${primaryColor}15`,
                color: isMinimalist ? '#ffffff' : primaryColor,
              }}
            >
              Proposta Comercial
            </span>
            <div className="text-sm font-bold text-slate-800 mt-2">
              #{proposal.proposalNumber || 'PROP-001'}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-end gap-1">
              <Calendar size={12} />
              <span>Emissão: {formatDate(proposal.issueDate)}</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5 flex items-center justify-end gap-1">
              <Clock size={12} />
              <span>Validade: {proposal.conditions.validityDays} dias</span>
            </div>
          </div>
        </div>

        {/* Project Title Banner & Summary */}
        <div className="my-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Projeto / Escopo Principal
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-1 leading-snug">
            {proposal.title || 'Proposta de Prestação de Serviços'}
          </h1>
          {proposal.projectSummary && (
            <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-100">
              {proposal.projectSummary}
            </p>
          )}
        </div>

        {/* Client Box */}
        <div
          className={`p-4 rounded-xl mb-8 border ${
            isMinimalist ? 'bg-white border-zinc-900' : 'bg-slate-50 border-slate-200/80'
          }`}
        >
          <span
            className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
              isMinimalist ? 'text-zinc-900' : 'text-slate-500'
            }`}
          >
            Preparado Especialmente Para:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <div className="font-bold text-sm text-slate-900">
                {proposal.client.name || 'Nome do Cliente'}
              </div>
              {proposal.client.contactRole && (
                <div className="text-slate-500 text-[11px]">{proposal.client.contactRole}</div>
              )}
              {proposal.client.companyName && (
                <div className="text-slate-700 font-medium mt-0.5">{proposal.client.companyName}</div>
              )}
              {proposal.client.document && (
                <div className="text-slate-500 mt-0.5">CNPJ/CPF: {proposal.client.document}</div>
              )}
            </div>

            <div className="space-y-1 text-slate-600 sm:text-right">
              {proposal.client.email && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail size={12} className="text-slate-400" />
                  <span>{proposal.client.email}</span>
                </div>
              )}
              {proposal.client.phone && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone size={12} className="text-slate-400" />
                  <span>{proposal.client.phone}</span>
                </div>
              )}
              {proposal.client.address && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin size={12} className="text-slate-400" />
                  <span>{proposal.client.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Items & Services Table */}
        <div className="mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="text-[11px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <th className="py-2.5 px-3 rounded-l-lg w-12 text-center">#</th>
                <th className="py-2.5 px-3">Descrição dos Serviços / Produtos</th>
                <th className="py-2.5 px-3 text-center w-16">Qtd</th>
                <th className="py-2.5 px-3 text-right w-28">Unitário</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg w-28">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {proposal.items.map((item, index) => {
                const itemTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

                return (
                  <tr
                    key={item.id}
                    className={
                      index % 2 === 0
                        ? 'bg-white'
                        : isMinimalist
                        ? 'bg-zinc-50/70'
                        : 'bg-slate-50/60'
                    }
                  >
                    <td className="py-3 px-3 text-center font-semibold text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                        {item.description || 'Item sem descrição'}
                      </div>
                      {item.details && (
                        <div className="text-[11px] text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                          {item.details}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center font-medium text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-600 font-medium">
                      {formatCurrency(item.unitPrice, proposal.currency)}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      {formatCurrency(itemTotal, proposal.currency)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pricing Totals */}
          <div className="flex justify-end mt-4">
            <div
              className={`w-full max-w-[280px] p-4 rounded-xl border space-y-2 text-xs ${
                isMinimalist
                  ? 'bg-zinc-50 border-zinc-200'
                  : 'bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatCurrency(subtotal, proposal.currency)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>
                    Desconto {proposal.discountType === 'percentage' ? `(${proposal.discount}%)` : ''}:
                  </span>
                  <span>- {formatCurrency(discountAmount, proposal.currency)}</span>
                </div>
              )}

              <div
                className={`flex justify-between text-sm font-bold pt-2 border-t ${
                  isMinimalist ? 'border-zinc-900 text-zinc-950' : 'border-slate-200'
                }`}
                style={{ color: isMinimalist ? '#09090b' : primaryColor }}
              >
                <span>Investimento Total:</span>
                <span className="text-base">{formatCurrency(grandTotal, proposal.currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones / Cronograma (Se preenchido) */}
        {(proposal.milestones || []).length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Milestone size={14} style={{ color: primaryColor }} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Cronograma de Entregas
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {proposal.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                    <span>
                      {idx + 1}. {m.title || 'Etapa'}
                    </span>
                    <span className="text-[11px] font-normal text-slate-500">{m.deadline}</span>
                  </div>
                  {m.deliverable && (
                    <p className="text-[11px] text-slate-600">{m.deliverable}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commercial Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div
            className={`p-4 rounded-xl border text-xs space-y-1.5 ${
              isMinimalist ? 'bg-white border-zinc-200' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock size={14} style={{ color: primaryColor }} />
              <span>Prazo de Execução</span>
            </div>
            <p className="text-slate-600">{proposal.conditions.deliveryTime || 'A combinar'}</p>
          </div>

          <div
            className={`p-4 rounded-xl border text-xs space-y-1.5 ${
              isMinimalist ? 'bg-white border-zinc-200' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CreditCard size={14} style={{ color: primaryColor }} />
              <span>Condições de Pagamento</span>
            </div>
            <p className="text-slate-600">{proposal.conditions.paymentMethod || 'A combinar'}</p>
          </div>
        </div>

        {/* PIX and Payment Banner */}
        {(proposal.provider.pixKey || proposal.provider.bankInfo) && (
          <div
            className={`p-4 rounded-xl border mb-6 text-xs ${
              isMinimalist ? 'bg-zinc-50 border-zinc-300' : 'bg-emerald-50/60 border-emerald-200'
            }`}
          >
            <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
              <QrCode size={14} className="text-emerald-600" />
              <span>Dados para Pagamento / PIX:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              {proposal.provider.pixKey && (
                <div>
                  <span className="font-semibold text-slate-900">Chave PIX:</span>{' '}
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                    {proposal.provider.pixKey}
                  </span>
                </div>
              )}
              {proposal.provider.bankInfo && (
                <div className="text-[11px] text-slate-600">{proposal.provider.bankInfo}</div>
              )}
            </div>
          </div>
        )}

        {/* Warranty & Extra Scope */}
        {(proposal.conditions.warranty || proposal.conditions.extraScopeTerms) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
            {proposal.conditions.warranty && (
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Award size={13} style={{ color: primaryColor }} />
                  <span>Garantia & Suporte</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {proposal.conditions.warranty}
                </p>
              </div>
            )}
            {proposal.conditions.extraScopeTerms && (
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertCircle size={13} style={{ color: primaryColor }} />
                  <span>Escopo Adicional</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {proposal.conditions.extraScopeTerms}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Notes / Clauses */}
        {proposal.conditions.notes && (
          <div
            className={`p-4 rounded-xl border mb-8 text-xs ${
              isMinimalist ? 'bg-white border-zinc-200' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={14} style={{ color: primaryColor }} />
              <span>Termos Gerais & Cláusulas de Aceite</span>
            </div>
            <div className="text-slate-600 space-y-1 whitespace-pre-line leading-relaxed">
              {proposal.conditions.notes}
            </div>
          </div>
        )}

        {/* Signature Area */}
        <div className="pt-10 grid grid-cols-2 gap-8 text-center text-xs">
          <div>
            <div className="border-b border-slate-400 w-4/5 mx-auto mb-2"></div>
            <div className="font-bold text-slate-900">{proposal.provider.name || 'Prestador'}</div>
            <div className="text-slate-500">Contratado(a)</div>
          </div>

          <div>
            <div className="border-b border-slate-400 w-4/5 mx-auto mb-2"></div>
            <div className="font-bold text-slate-900">{proposal.client.name || 'Cliente'}</div>
            <div className="text-slate-500">
              {proposal.client.companyName ? proposal.client.companyName : 'Contratante / Aceite'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-8 mt-12 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
        <span>Proposta gerada via PropostaPRO • Documento Confidencial</span>
        <span>Página 1 de 1</span>
      </div>
    </div>
  );
};
