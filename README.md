# 📄 PropostaPRO - Gerador Profissional de Propostas Comerciais

O **PropostaPRO** é uma aplicação web moderna, rápida e responsiva para autônomos, freelancers e agências gerarem propostas comerciais profissionais em PDF tamanho A4 em menos de 2 minutos.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 🚀 Funcionalidades Principais

- ⚡ **Interface em 4 Etapas:** Prestador & Tema, Cliente, Itens & Preços e Condições Comerciais.
- 🎨 **2 Temas Visuais Selecionáveis:** Corporativo Elegante (azul marinho e cinza) e Minimalista Moderno (preto e branco clean).
- 📱 **Totalmente Responsivo (PWA):** Otimizado para smartphones, podendo ser instalado na tela inicial.
- 🖨️ **Motor de PDF Vetorial A4:** Exportação instantânea em alta resolução via `@react-pdf/renderer` com nomenclatura inteligente: `Proposta_[NomeDoCliente].pdf`.
- 💾 **Persistência Automática:** Todos os dados são salvos no `localStorage` do navegador.
- 🔑 **Autenticação por Chave/Token:** Suporte para liberação automática via URL (`?token=PRO_VIP` ou `?key=CHAVE`).

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**
- **@react-pdf/renderer**

---

## 📦 Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Gerar build de produção
npm run build

# 4. Iniciar em produção
npm run start
```

---

## 🌐 Deploy na Vercel

1. Suba este projeto para um repositório no seu GitHub.
2. Acesse [vercel.com](https://vercel.com) e conecte sua conta do GitHub.
3. Importe o repositório `PropostaPRO` e clique em **Deploy**.
4. Em menos de 2 minutos sua aplicação estará online com link HTTPS próprio.
