'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  QrCode,
  Download,
  Smartphone,
  ShieldCheck,
  Calculator,
  Palette,
  FileCheck2,
} from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
  const [openId, setOpenId] = useState<string>('1');
  const [filter, setFilter] = useState<string>('all');

  if (!isOpen) return null;

  const faqs: FaqItem[] = [
    {
      id: '1',
      category: 'visual',
      question: 'Como escolher o tema visual e personalizar meu logotipo?',
      answer:
        'Na primeira seção "Dados do Prestador & Identidade", você pode alternar entre os temas "Corporativo Elegante" (azul marinho e cinza) e "Minimalista Moderno" (preto e branco clean). Você pode carregar o logotipo da sua empresa (PNG/JPG com fundo transparente fica excelente) e escolher uma cor primária personalizada.',
      icon: <Palette size={18} className="text-blue-500" />,
    },
    {
      id: '2',
      category: 'cliente',
      question: 'Os dados de e-mail e documento do cliente são obrigatórios?',
      answer:
        'Não! Apenas o Nome do Cliente ou Empresa é essencial para identificar o destinatário. Os campos de E-mail, Telefone/WhatsApp, CPF/CNPJ, Cargo e Endereço são 100% opcionais para dar flexibilidade a orçamentos rápidos.',
      icon: <FileCheck2 size={18} className="text-emerald-500" />,
    },
    {
      id: '3',
      category: 'financeiro',
      question: 'Como funciona a Chave PIX e os Dados Bancários na proposta?',
      answer:
        'No formulário do prestador, você pode inserir sua chave PIX (CNPJ, CPF, E-mail, Celular ou Aleatória) e os dados de conta bancária. Eles aparecem destacados no documento para que o cliente possa fazer o pagamento da entrada imediatamente após aprovar a proposta.',
      icon: <QrCode size={18} className="text-amber-500" />,
    },
    {
      id: '4',
      category: 'financeiro',
      question: 'Como funcionam os cálculos de quantidade, valor e descontos?',
      answer:
        'Ao alterar quantidades ou valores unitários dos serviços, o PropostaPRO calcula automaticamente os subtotais de cada item e o valor total final. Você também pode aplicar descontos em porcentagem (ex: 10%) ou em valor fixo (ex: R$ 500,00).',
      icon: <Calculator size={18} className="text-indigo-500" />,
    },
    {
      id: '5',
      category: 'pdf',
      question: 'Como gerar e baixar o PDF da melhor forma?',
      answer:
        'O botão "Baixar PDF" utiliza um motor vetorial que gera o arquivo pronto instantaneamente no padrão A4 com o nome "Proposta_[NomeDoCliente].pdf". Você também pode usar o botão "Imprimir" caso prefira salvar via assistente nativo de impressão do seu navegador.',
      icon: <Download size={18} className="text-blue-600" />,
    },
    {
      id: '6',
      category: 'mobile',
      question: 'Como usar o PropostaPRO no celular como um aplicativo?',
      answer:
        'No iPhone (Safari), toque no botão Compartilhar e selecione "Adicionar à Tela de Início". No Android (Chrome), toque no menu de 3 pontinhos e escolha "Instalar aplicativo" ou "Adicionar à tela inicial". Ele abrirá em tela cheia como um app nativo!',
      icon: <Smartphone size={18} className="text-purple-500" />,
    },
    {
      id: '7',
      category: 'privacidade',
      question: 'Minhas informações e propostas ficam salvas com segurança?',
      answer:
        'Sim! Todos os dados são salvos localmente na memória do seu próprio navegador (LocalStorage). Nenhuma informação confidencial de valores ou clientes é enviada para servidores externos, garantindo privacidade total.',
      icon: <ShieldCheck size={18} className="text-emerald-600" />,
    },
  ];

  const filteredFaqs =
    filter === 'all' ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
            <HelpCircle size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Perguntas Frequentes & Guia de Uso
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tire dúvidas rápidas sobre as funcionalidades do PropostaPRO
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Todas as Dúvidas
          </button>
          <button
            type="button"
            onClick={() => setFilter('visual')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'visual'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Visual & Temas
          </button>
          <button
            type="button"
            onClick={() => setFilter('financeiro')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'financeiro'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            PIX & Valores
          </button>
          <button
            type="button"
            onClick={() => setFilter('pdf')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'pdf'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Exportar PDF
          </button>
          <button
            type="button"
            onClick={() => setFilter('mobile')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'mobile'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            App no Celular
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div className="overflow-y-auto space-y-3 pr-1 flex-1">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <div className="flex items-center gap-2.5">
                    {faq.icon}
                    <span>{faq.question}</span>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
