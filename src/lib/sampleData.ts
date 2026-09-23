import { ProposalData } from '@/types/proposal';

const today = new Date().toISOString().split('T')[0];

export const defaultProposalData: ProposalData = {
  proposalNumber: 'PROP-2026-001',
  title: 'Desenvolvimento de Website Institucional e Identidade Visual',
  issueDate: today,
  currency: 'BRL',
  theme: 'corporate',
  discount: 10,
  discountType: 'percentage',
  provider: {
    name: 'Studio Nexus Design & Tech',
    document: '12.345.678/0001-90',
    email: 'contato@studionexus.com.br',
    phone: '(11) 98765-4321',
    address: 'Av. Paulista, 1000, Sala 52 - São Paulo, SP',
    website: 'https://studionexus.com.br',
    primaryColor: '#1e3a8a',
  },
  client: {
    name: 'Mariana Silveira',
    companyName: 'InovaTech Consultoria Ltda',
    document: '98.765.432/0001-10',
    email: 'mariana@inovatech.com.br',
    phone: '(11) 91234-5678',
    address: 'Rua Funchal, 418 - Vila Olímpia, São Paulo - SP',
  },
  items: [
    {
      id: '1',
      description: 'Redesign de Identidade Visual e Manual de Marca',
      details: 'Criação de logotipo, paleta de cores, tipografia institucional, pattern e guia de uso em PDF.',
      quantity: 1,
      unitPrice: 2800,
    },
    {
      id: '2',
      description: 'Desenvolvimento de Website Responsivo em Next.js',
      details: 'Estruturação de 5 páginas (Home, Sobre, Serviços, Portfólio, Contato), otimizado para SEO, Core Web Vitals e dispositivos móveis.',
      quantity: 1,
      unitPrice: 4500,
    },
    {
      id: '3',
      description: 'Configuração de Hospedagem e Domínio com SSL',
      details: 'Deploy na Vercel, integração de DNS com Cloudflare e configuração de certificado SSL gratuito.',
      quantity: 1,
      unitPrice: 600,
    },
    {
      id: '4',
      description: 'Suporte Técnico e Treinamento de Gestão',
      details: 'Treinamento de 2 horas gravado em vídeo + 30 dias de suporte e correções de bugs.',
      quantity: 1,
      unitPrice: 800,
    },
  ],
  conditions: {
    deliveryTime: '20 dias úteis após a aprovação e envio dos conteúdos',
    paymentMethod: '50% no ato da contratação e 50% na entrega e homologação final (PIX ou Boleto Bancário)',
    validityDays: 15,
    notes: '• As alterações solicitadas fora do escopo original serão orçadas separadamente.\n• O cliente fornecerá textos, imagens institucionais e acessos necessários para o início dos trabalhos.\n• Garantia de 30 dias para eventuais ajustes técnicos após o lançamento.',
  },
};

export const emptyProposalData: ProposalData = {
  proposalNumber: `PROP-${new Date().getFullYear()}-001`,
  title: '',
  issueDate: today,
  currency: 'BRL',
  theme: 'corporate',
  discount: 0,
  discountType: 'percentage',
  provider: {
    name: '',
    document: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    primaryColor: '#1e3a8a',
  },
  client: {
    name: '',
    companyName: '',
    document: '',
    email: '',
    phone: '',
    address: '',
  },
  items: [
    {
      id: '1',
      description: '',
      details: '',
      quantity: 1,
      unitPrice: 0,
    },
  ],
  conditions: {
    deliveryTime: '15 dias úteis',
    paymentMethod: '50% de entrada + 50% na entrega',
    validityDays: 10,
    notes: '',
  },
};
