'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatCurrency, calculateSubtotal, calculateDiscountAmount, calculateTotal } from '@/lib/formatters';
import {
  ListPlus,
  Trash2,
  Plus,
  Percent,
  FileText,
  Calendar,
  Hash,
  Layers,
  Sparkles,
  Milestone as MilestoneIcon,
} from 'lucide-react';

export const ItemsSection: React.FC = () => {
  const {
    proposal,
    updateMeta,
    addItem,
    removeItem,
    updateItem,
    addMilestone,
    removeMilestone,
    updateMilestone,
  } = useProposal();

  const subtotal = calculateSubtotal(proposal.items);
  const discountAmount = calculateDiscountAmount(
    subtotal,
    proposal.discount,
    proposal.discountType
  );
  const grandTotal = calculateTotal(subtotal, discountAmount);

  return (
    <Card
      title="3. Escopo, Serviços & Cronograma de Entrega"
      subtitle="Defina o título do projeto, descreva os serviços, valores unitários e etapas previstas"
      icon={<ListPlus size={20} />}
      collapsible
      defaultOpen
    >
      <div className="space-y-6">
        {/* Proposal Meta Data */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <div className="sm:col-span-3">
            <Input
              label="Título do Projeto / Proposta"
              placeholder="Ex: Desenvolvimento de Website Institucional e Identidade Visual"
              icon={<FileText size={16} />}
              value={proposal.title}
              onChange={(e) => updateMeta({ title: e.target.value })}
              required
            />
          </div>

          <div className="sm:col-span-3">
            <Textarea
              label="Resumo / Apresentação do Projeto (Opcional)"
              placeholder="Apresente brevemente o objetivo da proposta, dores resolvidas e o contexto do serviço..."
              rows={2}
              value={proposal.projectSummary || ''}
              onChange={(e) => updateMeta({ projectSummary: e.target.value })}
            />
          </div>

          <div>
            <Input
              label="Código / Número da Proposta"
              placeholder="PROP-2026-001"
              icon={<Hash size={16} />}
              value={proposal.proposalNumber}
              onChange={(e) => updateMeta({ proposalNumber: e.target.value })}
            />
          </div>

          <div>
            <Input
              label="Data de Emissão"
              type="date"
              icon={<Calendar size={16} />}
              value={proposal.issueDate}
              onChange={(e) => updateMeta({ issueDate: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Moeda
            </label>
            <select
              value={proposal.currency}
              onChange={(e) => updateMeta({ currency: e.target.value })}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm px-3 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="BRL">Real Brasileiro (R$)</option>
              <option value="USD">Dólar Americano ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Items List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Layers size={16} className="text-blue-500" />
              Itens e Serviços Orçados ({proposal.items.length})
            </h4>
          </div>

          {proposal.items.map((item, index) => {
            const itemTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm space-y-3 relative group transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>

                  <div className="flex items-center gap-3 ml-auto">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900">
                      Total: {formatCurrency(itemTotal, proposal.currency)}
                    </span>

                    {proposal.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="Remover este item"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-7">
                    <Input
                      label="Descrição do Serviço / Produto"
                      placeholder="Ex: Consultoria de Marketing Digital"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, { description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Input
                      label="Qtd"
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                      required
                    />
                  </div>

                  <div className="md:col-span-3">
                    <Input
                      label="Valor Unitário"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0,00"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                      required
                    />
                  </div>

                  <div className="md:col-span-12">
                    <Textarea
                      label="Detalhamento / Entregáveis do Item (Opcional)"
                      placeholder="Descreva o escopo detalhado, etapas inclusas, formatos de entrega..."
                      rows={2}
                      value={item.details || ''}
                      onChange={(e) => updateItem(item.id, { details: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <Button
            type="button"
            variant="outline"
            size="md"
            icon={<Plus size={16} />}
            onClick={addItem}
            className="w-full border-dashed border-2 py-3"
          >
            + Adicionar Outro Item / Serviço
          </Button>
        </div>

        {/* Project Milestones (Cronograma de Etapas Opcional) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MilestoneIcon size={16} className="text-indigo-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Cronograma de Etapas & Entregas (Opcional)
              </h4>
            </div>
            <button
              type="button"
              onClick={addMilestone}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              <Plus size={14} /> Adicionar Etapa
            </button>
          </div>

          {(proposal.milestones || []).length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              Nenhuma etapa cadastrada. Clique em &quot;+ Adicionar Etapa&quot; para detalhar o cronograma (ex: Briefing, Protótipo, Homologação, Entrega Final).
            </p>
          ) : (
            <div className="space-y-3">
              {(proposal.milestones || []).map((m, mIdx) => (
                <div
                  key={m.id}
                  className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Etapa {mIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeMilestone(m.id)}
                      className="text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <div className="sm:col-span-4">
                      <Input
                        placeholder="Nome da etapa (Ex: Protótipo)"
                        value={m.title}
                        onChange={(e) => updateMilestone(m.id, { title: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <Input
                        placeholder="Prazo (Ex: 5 dias úteis)"
                        value={m.deadline}
                        onChange={(e) => updateMilestone(m.id, { deadline: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-5">
                      <Input
                        placeholder="Entregável (Ex: Telas em alta definição)"
                        value={m.deliverable}
                        onChange={(e) => updateMilestone(m.id, { deliverable: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Discount & Totals Section */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Tipo de Desconto
              </label>
              <div className="flex rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => updateMeta({ discountType: 'percentage' })}
                  className={`flex-1 py-1.5 text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
                    proposal.discountType === 'percentage'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Percent size={14} /> Porcentagem (%)
                </button>
                <button
                  type="button"
                  onClick={() => updateMeta({ discountType: 'fixed' })}
                  className={`flex-1 py-1.5 text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
                    proposal.discountType === 'fixed'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Valor Fixo ({proposal.currency === 'BRL' ? 'R$' : '$'})
                </button>
              </div>
            </div>

            <div>
              <Input
                label={
                  proposal.discountType === 'percentage'
                    ? 'Desconto Aplicado (%)'
                    : `Desconto Aplicado (${proposal.currency})`
                }
                type="number"
                min="0"
                step={proposal.discountType === 'percentage' ? '1' : '0.01'}
                value={proposal.discount || 0}
                onChange={(e) => updateMeta({ discount: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal dos itens:</span>
              <span className="font-medium">{formatCurrency(subtotal, proposal.currency)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>
                  Desconto ({proposal.discountType === 'percentage' ? `${proposal.discount}%` : 'Fixo'}):
                </span>
                <span className="font-medium">- {formatCurrency(discountAmount, proposal.currency)}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700">
              <span>Valor Total da Proposta:</span>
              <span className="text-blue-600 dark:text-blue-400 text-lg">
                {formatCurrency(grandTotal, proposal.currency)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
