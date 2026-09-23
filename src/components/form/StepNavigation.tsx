'use client';

import React from 'react';
import { Building2, UserCheck, ListPlus, ShieldCheck } from 'lucide-react';

export const SECTIONS = [
  { id: 'section-provider', name: '1. Prestador', icon: Building2, desc: 'Identidade & PIX' },
  { id: 'section-client', name: '2. Cliente', icon: UserCheck, desc: 'Destinatário' },
  { id: 'section-items', name: '3. Itens', icon: ListPlus, desc: 'Escopo & Valores' },
  { id: 'section-conditions', name: '4. Condições', icon: ShieldCheck, desc: 'Prazos & Termos' },
];

export const StepNavigation: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm mb-6">
      <div className="grid grid-cols-4 gap-1 sm:gap-2">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;

          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl text-left transition-all hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Icon size={16} />
              </div>

              <div className="hidden sm:flex flex-col min-w-0">
                <span className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">
                  {sec.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate">{sec.desc}</span>
              </div>

              <span className="sm:hidden text-[10px] font-semibold text-center truncate w-full">
                {sec.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
