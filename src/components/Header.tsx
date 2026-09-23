'use client';

import React, { useState } from 'react';
import { useProposal } from '@/context/ProposalContext';
import { useLicense } from '@/context/LicenseContext';
import { Button } from '@/components/ui/Button';
import { generateAndDownloadPdf } from '@/lib/pdfGenerator';
import {
  FileSpreadsheet,
  RotateCcw,
  Sparkles,
  CheckCircle,
  Edit3,
  Eye,
  Download,
  Plus,
  HelpCircle,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { loadSampleData, resetProposal, isLoaded, activeTab, setActiveTab, addItem, proposal } = useProposal();
  const { isLicensed, setIsWelcomeOpen, setIsLicenseModalOpen } = useLicense();
  const [isExporting, setIsExporting] = useState(false);

  const handleReset = () => {
    if (confirm('Tem certeza que deseja limpar todos os campos da proposta?')) {
      resetProposal();
    }
  };

  const handleQuickDownload = async () => {
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

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 print:hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & License status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <FileSpreadsheet size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Proposta<span className="text-blue-600">PRO</span>
              </span>
              <button
                type="button"
                onClick={() => setIsLicenseModalOpen(true)}
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer transition-all hover:opacity-80 ${
                  isLicensed
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                }`}
                title="Clique para gerenciar a licença"
              >
                {isLicensed ? (
                  <>
                    <ShieldCheck size={11} /> PRO ATIVO
                  </>
                ) : (
                  <>
                    <KeyRound size={11} /> DEMO / ATIVAR
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Gerador profissional de propostas comerciais
            </p>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex lg:hidden bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'edit'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Edit3 size={14} /> Editar
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Eye size={14} /> Preview
          </button>
        </div>

        {/* Actions Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Help / Walkthrough button */}
          <button
            type="button"
            onClick={() => setIsWelcomeOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium"
            title="Como usar o PropostaPRO"
          >
            <HelpCircle size={17} className="text-blue-600 dark:text-blue-400" />
            <span className="hidden xl:inline">Instruções</span>
          </button>

          {/* License settings trigger */}
          <button
            type="button"
            onClick={() => setIsLicenseModalOpen(true)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium"
            title="Gerenciar Licença"
          >
            <KeyRound size={16} className="text-amber-500" />
            <span className="hidden xl:inline">Licença</span>
          </button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={<Sparkles size={14} className="text-amber-500" />}
            onClick={loadSampleData}
            title="Preencher com modelo demonstrativo"
          >
            <span className="hidden md:inline">Modelo</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<Plus size={14} />}
            onClick={addItem}
            title="Adicionar novo item/serviço à proposta"
            className="hidden sm:inline-flex"
          >
            + Item
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<RotateCcw size={14} />}
            onClick={handleReset}
            title="Limpar formulário e iniciar nova proposta"
            className="text-slate-600 hidden xs:inline-flex"
          >
            Limpar
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            icon={isExporting ? undefined : <Download size={15} />}
            isLoading={isExporting}
            onClick={handleQuickDownload}
            title="Baixar proposta em PDF instantaneamente"
            className="bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            <span className="hidden xs:inline">Baixar PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
