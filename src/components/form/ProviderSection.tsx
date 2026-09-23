'use client';

import React, { useRef } from 'react';
import { useProposal } from '@/context/ProposalContext';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ThemeSelector } from './ThemeSelector';
import { Building2, Upload, Trash2, Mail, Phone, MapPin, Globe, Palette } from 'lucide-react';

const COLOR_PRESETS = [
  { name: 'Azul Pro', value: '#1e3a8a' },
  { name: 'Índigo Moderno', value: '#4338ca' },
  { name: 'Esmeralda', value: '#065f46' },
  { name: 'Grafite Escuro', value: '#18181b' },
  { name: 'Púrpura Criativo', value: '#6b21a8' },
  { name: 'Laranja Solar', value: '#c2410c' },
];

export const ProviderSection: React.FC = () => {
  const { proposal, updateProvider } = useProposal();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        updateProvider({ logo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateProvider({ logo: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card
      title="Dados do Prestador & Identidade Visual"
      subtitle="Configure o visual e as informações profissionais que aparecem no topo da proposta"
      icon={<Building2 size={20} />}
      defaultOpen
    >
      <div className="space-y-6">
        {/* Visual Theme Selection */}
        <ThemeSelector />

        {/* Logo and Custom Branding Color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Logotipo / Foto de Perfil
            </label>
            <div className="flex items-center gap-3">
              {proposal.provider.logo ? (
                <div className="relative group w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white p-1 flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proposal.provider.logo}
                    alt="Logo Prestador"
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remover logotipo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 shrink-0 bg-white dark:bg-slate-900">
                  <Building2 size={20} />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors shadow-xs"
                >
                  <Upload size={14} />
                  {proposal.provider.logo ? 'Alterar Logo' : 'Enviar Logo'}
                </label>
                <span className="text-[11px] text-slate-400">PNG ou JPG até 2MB</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
              <Palette size={14} className="text-blue-500" /> Cor Primária de Destaque
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  title={color.name}
                  onClick={() => updateProvider({ primaryColor: color.value })}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    proposal.provider.primaryColor === color.value
                      ? 'border-slate-900 dark:border-white scale-110 shadow-sm'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
              <div className="flex items-center gap-1.5 ml-1">
                <input
                  type="color"
                  value={proposal.provider.primaryColor || '#1e3a8a'}
                  onChange={(e) => updateProvider({ primaryColor: e.target.value })}
                  className="w-7 h-7 rounded border border-slate-300 cursor-pointer bg-transparent"
                  title="Cor personalizada"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome Completo ou Razão Social"
            placeholder="Ex: Studio Nexus Design & Tech"
            value={proposal.provider.name}
            onChange={(e) => updateProvider({ name: e.target.value })}
            required
          />

          <Input
            label="CPF ou CNPJ"
            placeholder="00.000.000/0001-00"
            value={proposal.provider.document}
            onChange={(e) => updateProvider({ document: e.target.value })}
          />

          <Input
            label="E-mail de Contato"
            type="email"
            placeholder="contato@seusite.com"
            icon={<Mail size={16} />}
            value={proposal.provider.email}
            onChange={(e) => updateProvider({ email: e.target.value })}
          />

          <Input
            label="Telefone / WhatsApp"
            placeholder="(11) 99999-9999"
            icon={<Phone size={16} />}
            value={proposal.provider.phone}
            onChange={(e) => updateProvider({ phone: e.target.value })}
          />

          <Input
            label="Endereço / Cidade - UF"
            placeholder="Av. Paulista, 1000 - São Paulo, SP"
            icon={<MapPin size={16} />}
            value={proposal.provider.address}
            onChange={(e) => updateProvider({ address: e.target.value })}
          />

          <Input
            label="Website / Portfólio"
            placeholder="https://meuportfolio.com.br"
            icon={<Globe size={16} />}
            value={proposal.provider.website || ''}
            onChange={(e) => updateProvider({ website: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};
