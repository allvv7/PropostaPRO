'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, Clock, CreditCard, CalendarDays, Award, AlertCircle } from 'lucide-react';

export const ConditionsSection: React.FC = () => {
  const { proposal, updateConditions } = useProposal();

  return (
    <Card
      title="4. Condições Comerciais, Garantias & Aceite"
      subtitle="Defina prazos de entrega, formas de pagamento, garantia e cláusulas contratuais"
      icon={<ShieldCheck size={20} />}
      collapsible
      defaultOpen
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Prazo de Entrega / Execução"
              placeholder="Ex: 20 dias úteis após a aprovação e envio dos materiais"
              icon={<Clock size={16} />}
              value={proposal.conditions.deliveryTime}
              onChange={(e) => updateConditions({ deliveryTime: e.target.value })}
              required
            />
          </div>

          <div>
            <Input
              label="Validade da Proposta (em dias)"
              type="number"
              min="1"
              placeholder="15"
              icon={<CalendarDays size={16} />}
              value={proposal.conditions.validityDays}
              onChange={(e) => updateConditions({ validityDays: parseInt(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="md:col-span-3">
            <Input
              label="Forma e Condições de Pagamento"
              placeholder="Ex: 50% no ato do aceite e 50% na homologação final via PIX / Boleto"
              icon={<CreditCard size={16} />}
              value={proposal.conditions.paymentMethod}
              onChange={(e) => updateConditions({ paymentMethod: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-3">
            <Input
              label="Garantia e Suporte Pós-Entrega (Opcional)"
              placeholder="Ex: 30 dias de garantia para correções técnicas e suporte guiado"
              icon={<Award size={16} />}
              value={proposal.conditions.warranty || ''}
              onChange={(e) => updateConditions({ warranty: e.target.value })}
            />
          </div>

          <div className="md:col-span-3">
            <Input
              label="Cláusula de Escopo Adicional (Opcional)"
              placeholder="Ex: Alterações fora do escopo serão orçadas à parte no valor de R$ 120/hora"
              icon={<AlertCircle size={16} />}
              value={proposal.conditions.extraScopeTerms || ''}
              onChange={(e) => updateConditions({ extraScopeTerms: e.target.value })}
            />
          </div>

          <div className="md:col-span-3">
            <Textarea
              label="Observações Gerais, Termos de Aceite & Cancelamento"
              placeholder="Insira diretrizes sobre fornecimento de acessos, direitos autorais, aprovações..."
              rows={4}
              value={proposal.conditions.notes || ''}
              onChange={(e) => updateConditions({ notes: e.target.value })}
              helperText="Dica: Linhas com marcadores (• ou -) serão renderizadas com espaçamento limpo no PDF."
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
