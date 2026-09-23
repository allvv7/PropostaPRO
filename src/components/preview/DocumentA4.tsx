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
      className={`bg-white text-slate-800 w-full min-h-[1050px] print:min-h-0 max-w-[794px] mx-auto p-6 sm:p-10 print:p-0 shadow-2xl print:shadow-none rounded-sm flex flex-col justify-between print:max-w-full print:m-0 transition-all ${
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
            className="h-1.5 w-full rounded-full mb-5 print:mb-3"
            style={{ backgroundColor: primaryColor }}
          />
        )}

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-5 print:pb-3 border-b border-slate-200">
          <div className="space-y-2 max-w-[60%]">
            {proposal.provider.logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={proposal.provider.logo}
                alt="Logo Prestador"
                className="max-h-14 max-w-[180px] object-contain print:max-h-10"
              />
            ) : (
              <div
                className={`text-xl font-black tracking-tight ${
                  isMinimalist ? 'text-zinc-950 uppercase tracking-widest' : ''
                }`}
                style={{ color: isMinimalist ? '#09090b' : primaryColor }}
              >
                {proposal.provider.name || 'Nome do Prestador'}
              </div>
            )}

            {proposal.provider.logo && (
              <h2 className="text-base font-bold text-slate-900">
                {proposal.provider.name || 'Nome do Prestador'}
              </h2>
            )}

            <div className="text-xs text-slate-600 space-y-0.5 leading-tight">
              {proposal.provider.document && (
                <div>
                  <span className="font-medium text-slate-800">CNPJ/CPF:</span>{' '}
                  {proposal.provider.document}
                </div>
              )}
              {proposal.provider.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} className="shrink-0 text-slate-400" />
                  <span>{proposal.provider.address}</span>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                {proposal.provider.email && (
                  <div className="flex items-center gap-1">
                    <Mail size={11} className="shrink-0 text-slate-400" />
                    <span>{proposal.provider.email}</span>
                  </div>
                )}
                {proposal.provider.phone && (
                  <div className="flex items-center gap-1">
                    <Phone size={11} className="shrink-0 text-slate-400" />
                    <span>{proposal.provider.phone}</span>
                  </div>
                )}
                {proposal.provider.website && (
                  <div className="flex items-center gap-1">
                    <Globe size={11} className="shrink-0 text-slate-400" />
                    <span>{proposal.provider.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Proposal Meta Badge */}
          <div
            className={`text-right sm:self-start p-3 print:p-2 rounded-xl min-w-[180px] border ${
              isMinimalist
                ? 'bg-zinc-50 border-zinc-200'
                : 'bg-slate-50 border-slate-100'
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                isMinimalist ? 'bg-zinc-900 text-white' : ''
              }`}
              style={{
                backgroundColor: isMinimalist ? '#09090b' : `${primaryColor}15`,
                color: isMinimalist ? '#ffffff' : primaryColor,
              }}
            >
              Proposta Comercial
            </span>
            <div className="text-xs font-bold text-slate-800 mt-1">
              #{proposal.proposalNumber || 'PROP-001'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-end gap-1">
              <Calendar size={11} />
              <span>Emissão: {formatDate(proposal.issueDate)}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-end gap-1">
              <Clock size={11} />
              <span>Validade: {proposal.conditions.validityDays} dias</span>
            </div>
          </div>
        </div>

        {/* Project Title Banner & Summary */}
        <div className="my-4 print:my-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Projeto / Escopo
          </span>
          <h1 className="text-lg font-bold text-slate-900 mt-0.5 leading-snug">
            {proposal.title || 'Proposta de Prestação de Serviços'}
          </h1>
          {proposal.projectSummary && (
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
              {proposal.projectSummary}
            </p>
          )}
        </div>

        {/* Client Box */}
        <div
          className={`p-3.5 print:p-2.5 rounded-xl mb-4 print:mb-3 border break-inside-avoid ${
            isMinimalist ? 'bg-white border-zinc-900' : 'bg-slate-50 border-slate-200/80'
          }`}
        >
          <span
            className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
              isMinimalist ? 'text-zinc-900' : 'text-slate-500'
            }`}
          >
            Preparado Especialmente Para:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <div className="font-bold text-sm text-slate-900">
                {proposal.client.name || 'Nome do Cliente'}
              </div>
              {proposal.client.contactRole && (
                <div className="text-slate-500 text-[11px]">{proposal.client.contactRole}</div>
              )}
              {proposal.client.companyName && (
                <div className="text-slate-700 font-medium text-xs">{proposal.client.companyName}</div>
              )}
              {proposal.client.document && (
                <div className="text-slate-500 text-[11px]">CNPJ/CPF: {proposal.client.document}</div>
              )}
            </div>

            <div className="space-y-0.5 text-slate-600 sm:text-right text-xs">
              {proposal.client.email && (
                <div className="flex items-center sm:justify-end gap-1">
                  <Mail size={11} className="text-slate-400" />
                  <span>{proposal.client.email}</span>
                </div>
              )}
              {proposal.client.phone && (
                <div className="flex items-center sm:justify-end gap-1">
                  <Phone size={11} className="text-slate-400" />
                  <span>{proposal.client.phone}</span>
                </div>
              )}
              {proposal.client.address && (
                <div className="flex items-center sm:justify-end gap-1">
                  <MapPin size={11} className="text-slate-400" />
                  <span>{proposal.client.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Items & Services Table */}
        <div className="mb-4 print:mb-3 break-inside-avoid">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <th className="py-2 px-2.5 rounded-l-lg w-10 text-center">#</th>
                <th className="py-2 px-2.5">Descrição dos Serviços / Produtos</th>
                <th className="py-2 px-2.5 text-center w-14">Qtd</th>
                <th className="py-2 px-2.5 text-right w-24">Unitário</th>
                <th className="py-2 px-2.5 text-right rounded-r-lg w-24">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {proposal.items.map((item, index) => {
                const itemTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

                return (
                  <tr
                    key={item.id}
                    className={`break-inside-avoid ${
                      index % 2 === 0
                        ? 'bg-white'
                        : isMinimalist
                        ? 'bg-zinc-50/70'
                        : 'bg-slate-50/60'
                    }`}
                  >
                    <td className="py-2 px-2.5 text-center font-semibold text-slate-400 text-xs">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2.5">
                      <div className="font-semibold text-slate-900 text-xs">
                        {item.description || 'Item sem descrição'}
                      </div>
                      {item.details && (
                        <div className="text-[10px] text-slate-500 mt-0.5 whitespace-pre-line leading-relaxed">
                          {item.details}
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-2.5 text-center font-medium text-slate-700 text-xs">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-2.5 text-right text-slate-600 font-medium text-xs">
                      {formatCurrency(item.unitPrice, proposal.currency)}
                    </td>
                    <td className="py-2 px-2.5 text-right font-bold text-slate-900 text-xs">
                      {formatCurrency(itemTotal, proposal.currency)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pricing Totals */}
          <div className="flex justify-end mt-2.5 break-inside-avoid">
            <div
              className={`w-full max-w-[260px] p-3 rounded-xl border space-y-1 text-xs ${
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
                <div className="flex justify-between text-emerald-600 font-medium text-[11px]">
                  <span>
                    Desconto {proposal.discountType === 'percentage' ? `(${proposal.discount}%)` : ''}:
                  </span>
                  <span>- {formatCurrency(discountAmount, proposal.currency)}</span>
                </div>
              )}

              <div
                className={`flex justify-between text-xs font-bold pt-1 border-t ${
                  isMinimalist ? 'border-zinc-900 text-zinc-950' : 'border-slate-200'
                }`}
                style={{ color: isMinimalist ? '#09090b' : primaryColor }}
              >
                <span>Investimento Total:</span>
                <span className="text-sm">{formatCurrency(grandTotal, proposal.currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones / Cronograma (Se preenchido) */}
        {(proposal.milestones || []).length > 0 && (
          <div className="mb-4 print:mb-2 break-inside-avoid">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Milestone size={13} style={{ color: primaryColor }} />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                Cronograma de Entregas
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              {proposal.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className="p-2 rounded-lg border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between text-[11px]"
                >
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>
                      {idx + 1}. {m.title || 'Etapa'}
                    </span>
                    <span className="text-[10px] font-normal text-slate-500">{m.deadline}</span>
                  </div>
                  {m.deliverable && (
                    <p className="text-[10px] text-slate-600 mt-0.5">{m.deliverable}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commercial Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 print:mb-2 break-inside-avoid">
          <div
            className={`p-3 rounded-xl border text-xs space-y-1 ${
              isMinimalist ? 'bg-white border-zinc-200' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
              <Clock size={13} style={{ color: primaryColor }} />
              <span>Prazo de Execução</span>
            </div>
            <p className="text-slate-600 text-[11px]">{proposal.conditions.deliveryTime || 'A combinar'}</p>
          </div>

          <div
            className={`p-3 rounded-xl border text-xs space-y-1 ${
              isMinimalist ? 'bg-white border-zinc-200' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
              <CreditCard size={13} style={{ color: primaryColor }} />
              <span>Condições de Pagamento</span>
            </div>
            <p className="text-slate-600 text-[11px]">{proposal.conditions.paymentMethod || 'A combinar'}</p>
          </div>
        </div>

        {/* PIX and Payment Banner */}
        {(proposal.provider.pixKey || proposal.provider.bankInfo) && (
          <div
            className={`p-3 rounded-xl border mb-3 print:mb-2 text-xs break-inside-avoid ${
              isMinimalist ? 'bg-zinc-50 border-zinc-300' : 'bg-emerald-50/60 border-emerald-200'
            }`}
          >
            <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1 text-[11px]">
              <QrCode size={13} className="text-emerald-600" />
              <span>Dados para Pagamento / PIX:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700 text-[11px]">
              {proposal.provider.pixKey && (
                <div>
                  <span className="font-semibold text-slate-900">Chave PIX:</span>{' '}
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {proposal.provider.pixKey}
                  </span>
                </div>
              )}
              {proposal.provider.bankInfo && (
                <div className="text-[10px] text-slate-600">{proposal.provider.bankInfo}</div>
              )}
            </div>
          </div>
        )}

        {/* Warranty & Extra Scope */}
        {(proposal.conditions.warranty || proposal.conditions.extraScopeTerms) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 print:mb-2 text-xs break-inside-avoid">
            {proposal.conditions.warranty && (
              <div className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                  <Award size={12} style={{ color: primaryColor }} />
                  <span>Garantia & Suporte</span>
                </div>
                <p className="text-slate-600 text-[10px] leading-relaxed">
                  {proposal.conditions.warranty}
                </p>
              </div>
            )}
            {proposal.conditions.extraScopeTerms && (
              <div className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
                  <AlertCircle size={12} style={{ color: primaryColor }} />
                  <span>Escopo Adicional</span>
                </div>
                <p className="text-slate-600 text-[10px] leading-relaxed">
                  {proposal.conditions.extraScopeTerms}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Notes / Clauses */}
        {proposal.conditions.notes && (
          <div
            className={`p-3 rounded-xl border mb-4 print:mb-2 text-xs break-inside-avoid ${
              isMinimalist ? 'bg-white border-zinc-200' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-[11px]">
              <CheckCircle2 size={13} style={{ color: primaryColor }} />
              <span>Termos Gerais & Cláusulas de Aceite</span>
            </div>
            <div className="text-slate-600 space-y-0.5 text-[10px] whitespace-pre-line leading-relaxed">
              {proposal.conditions.notes}
            </div>
          </div>
        )}

        {/* Signature Area */}
        <div className="pt-6 print:pt-4 grid grid-cols-2 gap-6 text-center text-xs break-inside-avoid">
          <div>
            <div className="border-b border-slate-400 w-4/5 mx-auto mb-1.5"></div>
            <div className="font-bold text-slate-900 text-xs">{proposal.provider.name || 'Prestador'}</div>
            <div className="text-slate-500 text-[11px]">Contratado(a)</div>
          </div>

          <div>
            <div className="border-b border-slate-400 w-4/5 mx-auto mb-1.5"></div>
            <div className="font-bold text-slate-900 text-xs">{proposal.client.name || 'Cliente'}</div>
            <div className="text-slate-500 text-[11px]">
              {proposal.client.companyName ? proposal.client.companyName : 'Contratante / Aceite'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 mt-6 print:pt-2 print:mt-3 border-t border-slate-100 flex justify-between items-center text-[9px] text-slate-400 break-inside-avoid">
        <span>Documento Confidencial • Proposta Comercial</span>
        <span>Página 1 de 1</span>
      </div>
    </div>
  );
};
