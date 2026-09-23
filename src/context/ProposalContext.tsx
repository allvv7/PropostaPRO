'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ProposalData,
  ProposalItem,
  ProviderInfo,
  ClientInfo,
  CommercialConditions,
  ProposalTheme,
  ProjectMilestone,
} from '@/types/proposal';
import { defaultProposalData, emptyProposalData } from '@/lib/sampleData';

const LOCAL_STORAGE_KEY = 'proposta_pro_data_v2';

interface ProposalContextType {
  proposal: ProposalData;
  isLoaded: boolean;
  updateProvider: (data: Partial<ProviderInfo>) => void;
  updateClient: (data: Partial<ClientInfo>) => void;
  updateConditions: (data: Partial<CommercialConditions>) => void;
  updateMeta: (
    data: Partial<
      Pick<
        ProposalData,
        | 'proposalNumber'
        | 'title'
        | 'projectSummary'
        | 'issueDate'
        | 'currency'
        | 'discount'
        | 'discountType'
        | 'theme'
      >
    >
  ) => void;
  setTheme: (theme: ProposalTheme) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<ProposalItem>) => void;
  addMilestone: () => void;
  removeMilestone: (id: string) => void;
  updateMilestone: (id: string, milestone: Partial<ProjectMilestone>) => void;
  loadSampleData: () => void;
  resetProposal: () => void;
  activeTab: 'edit' | 'preview';
  setActiveTab: (tab: 'edit' | 'preview') => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export function ProposalProvider({ children }: { children: React.ReactNode }) {
  const [proposal, setProposal] = useState<ProposalData>(defaultProposalData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('proposta_pro_data_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setProposal({
            ...defaultProposalData,
            ...parsed,
            provider: {
              ...defaultProposalData.provider,
              ...parsed.provider,
            },
            client: {
              ...defaultProposalData.client,
              ...parsed.client,
            },
            conditions: {
              ...defaultProposalData.conditions,
              ...parsed.conditions,
            },
            milestones: parsed.milestones || defaultProposalData.milestones,
            theme: parsed.theme || 'corporate',
          });
        }
      }
    } catch (e) {
      console.error('Failed to load proposal from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when proposal changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(proposal));
    } catch (e) {
      console.error('Failed to save proposal to localStorage', e);
    }
  }, [proposal, isLoaded]);

  const updateProvider = (data: Partial<ProviderInfo>) => {
    setProposal((prev) => ({
      ...prev,
      provider: { ...prev.provider, ...data },
    }));
  };

  const updateClient = (data: Partial<ClientInfo>) => {
    setProposal((prev) => ({
      ...prev,
      client: { ...prev.client, ...data },
    }));
  };

  const updateConditions = (data: Partial<CommercialConditions>) => {
    setProposal((prev) => ({
      ...prev,
      conditions: { ...prev.conditions, ...data },
    }));
  };

  const updateMeta = (
    data: Partial<
      Pick<
        ProposalData,
        | 'proposalNumber'
        | 'title'
        | 'projectSummary'
        | 'issueDate'
        | 'currency'
        | 'discount'
        | 'discountType'
        | 'theme'
      >
    >
  ) => {
    setProposal((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const setTheme = (theme: ProposalTheme) => {
    setProposal((prev) => ({
      ...prev,
      theme,
      provider: {
        ...prev.provider,
        primaryColor: theme === 'corporate' ? '#1e3a8a' : '#18181b',
      },
    }));
  };

  const addItem = () => {
    const newItem: ProposalItem = {
      id: Date.now().toString(),
      description: '',
      details: '',
      quantity: 1,
      unitPrice: 0,
    };
    setProposal((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeItem = (id: string) => {
    setProposal((prev) => {
      if (prev.items.length <= 1) return prev;
      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
  };

  const updateItem = (id: string, updatedFields: Partial<ProposalItem>) => {
    setProposal((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      ),
    }));
  };

  const addMilestone = () => {
    const newMilestone: ProjectMilestone = {
      id: Date.now().toString(),
      title: '',
      deadline: '',
      deliverable: '',
    };
    setProposal((prev) => ({
      ...prev,
      milestones: [...(prev.milestones || []), newMilestone],
    }));
  };

  const removeMilestone = (id: string) => {
    setProposal((prev) => ({
      ...prev,
      milestones: (prev.milestones || []).filter((m) => m.id !== id),
    }));
  };

  const updateMilestone = (id: string, fields: Partial<ProjectMilestone>) => {
    setProposal((prev) => ({
      ...prev,
      milestones: (prev.milestones || []).map((m) =>
        m.id === id ? { ...m, ...fields } : m
      ),
    }));
  };

  const loadSampleData = () => {
    setProposal(defaultProposalData);
  };

  const resetProposal = () => {
    setProposal(emptyProposalData);
  };

  return (
    <ProposalContext.Provider
      value={{
        proposal,
        isLoaded,
        updateProvider,
        updateClient,
        updateConditions,
        updateMeta,
        setTheme,
        addItem,
        removeItem,
        updateItem,
        addMilestone,
        removeMilestone,
        updateMilestone,
        loadSampleData,
        resetProposal,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposal() {
  const context = useContext(ProposalContext);
  if (!context) {
    throw new Error('useProposal must be used within a ProposalProvider');
  }
  return context;
}
