'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Sparkles, FileText, CheckCircle2, Download, ArrowRight, X, ShieldCheck } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      number: '1',
      title: 'Configure sua Identidade & Tema',
      description: 'Insira seus dados ou da sua empresa, envie seu logotipo e selecione entre os temas Corporativo Elegante ou Minimalista.',
      icon: Sparkles,
      color: 'bg-blue-500 text-white',
    },
    {
      number: '2',
      title: 'Descreva os Itens & Condições',
      description: 'Adicione os serviços prestados com quantidades e valores. Defina prazos de entrega, formas de pagamento e validade.',
      icon: FileText,
      color: 'bg-indigo-500 text-white',
    },
    {
      number: '3',
      title: 'Preview em Tempo Real & Baixar PDF',
      description: 'Acompanhe as alterações instantaneamente no documento A4 e baixe seu PDF vetorial pronto para envio ao cliente.',
      icon: Download,
      color: 'bg-emerald-500 text-white',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 sm:p-8 relative overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Sparkles size={24} />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Bem-vindo ao <span className="text-blue-600">PropostaPRO</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            Crie propostas comerciais irresistíveis em PDF vetorial em apenas 3 passos simples.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold shadow-xs ${step.color}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Passo {step.number}
                    </span>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Dados salvos 100% no seu navegador</span>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 font-semibold shadow-md shadow-blue-500/20"
          >
            Começar a Criar <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
