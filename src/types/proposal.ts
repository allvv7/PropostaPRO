export type ProposalTheme = 'corporate' | 'minimalist';

export interface ProviderInfo {
  name: string;
  document: string; // CPF or CNPJ
  email: string;
  phone: string;
  address: string;
  website?: string;
  logo?: string; // Base64 data URL
  primaryColor?: string; // Custom branding color
  pixKey?: string; // Chave PIX para pagamento imediato
  pixType?: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random' | 'manual';
  bankInfo?: string; // Dados bancários adicionais
}

export interface ClientInfo {
  name: string;
  companyName?: string;
  contactRole?: string; // Cargo/Função (Ex: Diretora de Marketing)
  document?: string; // CPF or CNPJ
  email?: string; // Opcional
  phone?: string; // WhatsApp/Telefone
  address?: string;
}

export interface ProposalItem {
  id: string;
  description: string;
  details?: string;
  quantity: number;
  unitPrice: number;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  deadline: string;
  deliverable: string;
}

export interface CommercialConditions {
  deliveryTime: string; // e.g., "15 dias úteis"
  paymentMethod: string; // e.g., "50% de entrada + 50% na entrega via PIX"
  validityDays: number; // e.g., 10 dias
  warranty?: string; // Garantia (Ex: 30 dias de suporte e correções)
  extraScopeTerms?: string; // Cláusula sobre horas/alterações extras
  notes?: string; // Observações / Termos gerais
}

export interface ProposalData {
  proposalNumber: string;
  title: string;
  projectSummary?: string; // Resumo/Objetivo do Projeto
  issueDate: string;
  currency: string;
  theme: ProposalTheme;
  discount: number;
  discountType: 'percentage' | 'fixed';
  provider: ProviderInfo;
  client: ClientInfo;
  items: ProposalItem[];
  milestones: ProjectMilestone[];
  conditions: CommercialConditions;
}
