'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { ShieldCheck, Clock, CreditCard, CalendarDays } from 'lucide-react';

export const ConditionsSection: React.FC = () => {
  const { proposal, updateConditions } = useProposal();

  return (
    <Card
      title="Condições Comerciais"
      subtitle="Prazos, formas de pagamento, validade e termos contratuais"
      icon={<ShieldCheck size={20} />}
      collapsible
      defaultOpen
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Prazo de Entrega / Execução"
              placeholder="Ex: 15 dias úteis após aprovação"
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
              placeholder="10"
              icon={<CalendarDays size={16} />}
              value={proposal.conditions.validityDays}
              onChange={(e) => updateConditions({ validityDays: parseInt(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="md:col-span-3">
            <Input
              label="Forma e Condições de Pagamento"
              placeholder="Ex: 50% de entrada + 50% na aprovação final (PIX / Boleto / Cartão)"
              icon={<CreditCard size={16} />}
              value={proposal.conditions.paymentMethod}
              onChange={(e) => updateConditions({ paymentMethod: e.target.value })}
              required
            />
          </div>

          <div className="md:col-span-3">
            <Textarea
              label="Observações, Termos Gerais e Cláusulas de Aceite"
              placeholder="Insira diretrizes sobre alterações de escopo, garantias, direitos autorais..."
              rows={4}
              value={proposal.conditions.notes || ''}
              onChange={(e) => updateConditions({ notes: e.target.value })}
              helperText="Cada linha iniciada com marcador (• ou -) será formatada elegantemente no PDF."
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
