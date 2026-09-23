'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { Building2, UserCheck, ListPlus, ShieldCheck, Check } from 'lucide-react';

export const STEPS = [
  { id: 1, name: 'Prestador', icon: Building2, desc: 'Identidade & Tema' },
  { id: 2, name: 'Cliente', icon: UserCheck, desc: 'Destinatário' },
  { id: 3, name: 'Itens & Preços', icon: ListPlus, desc: 'Escopo & Valores' },
  { id: 4, name: 'Condições', icon: ShieldCheck, desc: 'Prazos & Termos' },
];

export const StepNavigation: React.FC = () => {
  const { activeStep, setActiveStep } = useProposal();

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm mb-6">
      <div className="grid grid-cols-4 gap-1 sm:gap-2">
        {STEPS.map((step) => {
          const isActive = activeStep === step.id;
          const isCompleted = activeStep > step.id;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              className={`flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2.5 p-2 sm:p-3 rounded-xl text-left transition-all relative ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900 shadow-xs'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-transparent'
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : <Icon size={16} />}
              </div>

              <div className="hidden sm:flex flex-col min-w-0">
                <span
                  className={`text-xs font-bold truncate ${
                    isActive ? 'text-blue-950 dark:text-blue-100' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {step.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate">{step.desc}</span>
              </div>

              {/* Mobile text */}
              <span className="sm:hidden text-[10px] font-semibold text-center truncate w-full">
                {step.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
