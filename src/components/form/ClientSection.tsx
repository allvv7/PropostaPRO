'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { UserCheck, Mail, Phone, MapPin, Building, Briefcase } from 'lucide-react';

export const ClientSection: React.FC = () => {
  const { proposal, updateClient } = useProposal();

  return (
    <Card
      title="2. Dados do Cliente / Destinatário"
      subtitle="Identificação da pessoa ou empresa que receberá o orçamento (Campos de contato são opcionais)"
      icon={<UserCheck size={20} />}
      collapsible
      defaultOpen
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome do Contato ou Responsável"
          placeholder="Ex: Mariana Silveira ou Carlos Eduardo"
          value={proposal.client.name}
          onChange={(e) => updateClient({ name: e.target.value })}
          required
        />

        <Input
          label="Empresa / Razão Social (Opcional)"
          placeholder="Ex: InovaTech Consultoria Ltda"
          icon={<Building size={16} />}
          value={proposal.client.companyName || ''}
          onChange={(e) => updateClient({ companyName: e.target.value })}
        />

        <Input
          label="Cargo / Função do Contato (Opcional)"
          placeholder="Ex: Diretora de Marketing ou Sócio"
          icon={<Briefcase size={16} />}
          value={proposal.client.contactRole || ''}
          onChange={(e) => updateClient({ contactRole: e.target.value })}
        />

        <Input
          label="Telefone / WhatsApp (Opcional)"
          placeholder="(11) 91234-5678"
          icon={<Phone size={16} />}
          value={proposal.client.phone || ''}
          onChange={(e) => updateClient({ phone: e.target.value })}
        />

        <Input
          label="E-mail do Cliente (Opcional)"
          type="email"
          placeholder="cliente@empresa.com"
          icon={<Mail size={16} />}
          value={proposal.client.email || ''}
          onChange={(e) => updateClient({ email: e.target.value })}
        />

        <Input
          label="CPF ou CNPJ do Cliente (Opcional)"
          placeholder="00.000.000/0001-00"
          value={proposal.client.document || ''}
          onChange={(e) => updateClient({ document: e.target.value })}
        />

        <div className="md:col-span-2">
          <Input
            label="Endereço / Cidade do Cliente (Opcional)"
            placeholder="Ex: Rua Funchal, 418 - São Paulo, SP"
            icon={<MapPin size={16} />}
            value={proposal.client.address || ''}
            onChange={(e) => updateClient({ address: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};
