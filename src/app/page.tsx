'use client';

import React from 'react';
import { useProposal } from '@/context/ProposalContext';
import { ProposalForm } from '@/components/form/ProposalForm';
import { ProposalPreview } from '@/components/preview/ProposalPreview';

export default function Home() {
  const { activeTab } = useProposal();

  return (
    <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8">
      {/* Desktop Split View & Mobile Tabbed View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Panel */}
        <section
          className={`lg:col-span-6 xl:col-span-5 ${
            activeTab === 'edit' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ProposalForm />
        </section>

        {/* Live Preview Panel */}
        <section
          className={`lg:col-span-6 xl:col-span-7 lg:sticky lg:top-24 ${
            activeTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ProposalPreview />
        </section>
      </div>
    </main>
  );
}
