'use client';

import React, { useState } from 'react';
import { useProposal } from '@/context/ProposalContext';
import { StepNavigation } from './StepNavigation';
import { ProviderSection } from './ProviderSection';
import { ClientSection } from './ClientSection';
import { ItemsSection } from './ItemsSection';
import { ConditionsSection } from './ConditionsSection';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, Download, CheckCircle, RotateCcw } from 'lucide-react';
import { generateAndDownloadPdf } from '@/lib/pdfGenerator';

export const ProposalForm: React.FC = () => {
  const { activeStep, setActiveStep, proposal, resetProposal, setActiveTab } = useProposal();
  const [isExporting, setIsExporting] = useState(false);

  const nextStep = () => {
    setActiveStep(Math.min(4, activeStep + 1));
  };

  const prevStep = () => {
    setActiveStep(Math.max(1, activeStep - 1));
  };

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
    <div className="space-y-4 pb-12">
      {/* 4-Step Navigation Header */}
      <StepNavigation />

      {/* Dynamic Active Step Content */}
      <div className="transition-all duration-200">
        {activeStep === 1 && <ProviderSection />}
        {activeStep === 2 && <ClientSection />}
        {activeStep === 3 && <ItemsSection />}
        {activeStep === 4 && <ConditionsSection />}
      </div>

      {/* Bottom Step Actions Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          {activeStep > 1 && (
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={<ArrowLeft size={16} />}
              onClick={prevStep}
            >
              Voltar
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            icon={<RotateCcw size={14} />}
            onClick={handleReset}
            title="Limpar todos os campos"
            className="text-slate-500"
          >
            Limpar
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {activeStep < 4 ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              Próximo Passo <ArrowRight size={16} />
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setActiveTab('preview')}
                className="lg:hidden"
              >
                Ver Preview
              </Button>

              <Button
                type="button"
                variant="primary"
                size="md"
                icon={isExporting ? undefined : <Download size={16} />}
                isLoading={isExporting}
                onClick={handleDownload}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20"
              >
                Baixar PDF Agora
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
