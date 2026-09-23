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
}

export interface ClientInfo {
  name: string;
  companyName?: string;
  document?: string; // CPF or CNPJ
  email: string;
  phone: string;
  address?: string;
}

export interface ProposalItem {
  id: string;
  description: string;
  details?: string;
  quantity: number;
  unitPrice: number;
}

export interface CommercialConditions {
  deliveryTime: string; // e.g., "15 dias úteis"
  paymentMethod: string; // e.g., "50% de entrada + 50% na entrega via PIX"
  validityDays: number; // e.g., 10 days
  notes?: string; // Observações / Termos gerais
}

export interface ProposalData {
  proposalNumber: string;
  title: string;
  issueDate: string;
  currency: string;
  theme: ProposalTheme;
  discount: number; // in percentage or fixed value
  discountType: 'percentage' | 'fixed';
  provider: ProviderInfo;
  client: ClientInfo;
  items: ProposalItem[];
  conditions: CommercialConditions;
}
