'use client';

import React, { useState } from 'react';
import { useProposal } from '@/context/ProposalContext';
import { ProviderSection } from './ProviderSection';
import { ClientSection } from './ClientSection';
import { ItemsSection } from './ItemsSection';
import { ConditionsSection } from './ConditionsSection';
import { Button } from '@/components/ui/Button';
import { Download, Sparkles, RotateCcw, Building2, UserCheck, ListPlus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { generateAndDownloadPdf } from '@/lib/pdfGenerator';

export const ProposalForm: React.FC = () => {
  const { proposal, resetProposal, loadSampleData, setActiveTab } = useProposal();
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await generateAndDownloadPdf(proposal);
    } catch (e) {
      console.error(e);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja limpar todos os campos da proposta?')) {
      resetProposal();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Quick Navigation Anchor Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2.5 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 hidden sm:inline">
            Seções:
          </span>
          <a
            href="#section-provider"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Building2 size={13} className="text-blue-500" /> Prestador
          </a>
          <a
            href="#section-client"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <UserCheck size={13} className="text-emerald-500" /> Cliente
          </a>
          <a
            href="#section-items"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <ListPlus size={13} className="text-indigo-500" /> Itens & Valores
          </a>
          <a
            href="#section-conditions"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <ShieldCheck size={13} className="text-purple-500" /> Condições
          </a>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={<Sparkles size={13} className="text-amber-500" />}
            onClick={loadSampleData}
            title="Preencher com modelo demonstrativo"
          >
            <span className="hidden md:inline">Modelo</span>
          </Button>
        </div>
      </div>

      {/* Form Sections */}
      <div id="section-provider">
        <ProviderSection />
      </div>

      <div id="section-client">
        <ClientSection />
      </div>

      <div id="section-items">
        <ItemsSection />
      </div>

      <div id="section-conditions">
        <ConditionsSection />
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-3 sticky bottom-4 z-20">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <CheckCircle2 size={16} className="text-emerald-500" />
          <span>Alterações salvas automaticamente</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setActiveTab('preview')}
            className="lg:hidden"
          >
            Ver Preview A4
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            icon={<RotateCcw size={14} />}
            onClick={handleReset}
            title="Limpar formulário"
          >
            Limpar
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            icon={isExporting ? undefined : <Download size={16} />}
            isLoading={isExporting}
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20"
          >
            Baixar Proposta em PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
