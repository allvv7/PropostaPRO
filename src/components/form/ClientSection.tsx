'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { UserCheck, Mail, Phone, MapPin, Building } from 'lucide-react';

export const ClientSection: React.FC = () => {
  const { proposal, updateClient } = useProposal();

  return (
    <Card
      title="Dados do Cliente"
      subtitle="Identificação da empresa ou pessoa que receberá a proposta"
      icon={<UserCheck size={20} />}
      collapsible
      defaultOpen
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome do Contato / Responsável"
          placeholder="Ex: Carlos Eduardo"
          value={proposal.client.name}
          onChange={(e) => updateClient({ name: e.target.value })}
          required
        />

        <Input
          label="Empresa / Razão Social"
          placeholder="Ex: StartUp Tech Serviços Ltda"
          icon={<Building size={16} />}
          value={proposal.client.companyName || ''}
          onChange={(e) => updateClient({ companyName: e.target.value })}
        />

        <Input
          label="E-mail"
          type="email"
          placeholder="cliente@empresa.com"
          icon={<Mail size={16} />}
          value={proposal.client.email}
          onChange={(e) => updateClient({ email: e.target.value })}
        />

        <Input
          label="Telefone / WhatsApp"
          placeholder="(11) 98888-7777"
          icon={<Phone size={16} />}
          value={proposal.client.phone}
          onChange={(e) => updateClient({ phone: e.target.value })}
        />

        <Input
          label="CPF ou CNPJ do Cliente"
          placeholder="00.000.000/0001-00"
          value={proposal.client.document || ''}
          onChange={(e) => updateClient({ document: e.target.value })}
        />

        <Input
          label="Endereço / Cidade"
          placeholder="Rua das Flores, 123 - Curitiba, PR"
          icon={<MapPin size={16} />}
          value={proposal.client.address || ''}
          onChange={(e) => updateClient({ address: e.target.value })}
        />
      </div>
    </Card>
  );
};
