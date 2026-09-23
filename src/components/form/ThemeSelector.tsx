'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { ProposalTheme } from '@/types/proposal';
import { Check, Sparkles, Layers } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { proposal, setTheme } = useProposal();

  const themes: {
    id: ProposalTheme;
    name: string;
    description: string;
    colors: string[];
    badge: string;
  }[] = [
    {
      id: 'corporate',
      name: 'Corporativo Elegante',
      description: 'Azul marinho clássico e cinza refinado. Ideal para empresas e consultorias.',
      colors: ['#1e3a8a', '#3b82f6', '#f1f5f9'],
      badge: 'Mais Popular',
    },
    {
      id: 'minimalist',
      name: 'Minimalista Moderno',
      description: 'Preto e branco clean, linhas finas e tipografia pura. Ideal para design e tech.',
      colors: ['#09090b', '#71717a', '#fafafa'],
      badge: 'Clean & Tech',
    },
  ];

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
        <Sparkles size={14} className="text-blue-500" />
        Tema Visual da Proposta
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {themes.map((t) => {
          const isSelected = proposal.theme === t.id;
          return (
            <div
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative cursor-pointer p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    {t.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {t.badge}
                  </span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isSelected && <Check size={10} strokeWidth={3} />}
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                {t.description}
              </p>

              {/* Color swatches preview */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {t.colors.map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-slate-300/60 shadow-xs"
                    style={{ backgroundColor: c }}
                  />
                ))}
                <span className="text-[10px] text-slate-400 ml-1">Paleta de estilo</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
