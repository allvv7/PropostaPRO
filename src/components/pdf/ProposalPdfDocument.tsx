import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ProposalData } from '@/types/proposal';
import {
  formatCurrency,
  formatDate,
  calculateSubtotal,
  calculateDiscountAmount,
  calculateTotal,
} from '@/lib/formatters';

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#334155',
    backgroundColor: '#ffffff',
    lineHeight: 1.4,
  },
  accentBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
  },
  providerInfo: {
    maxWidth: '58%',
  },
  logo: {
    maxHeight: 44,
    maxWidth: 160,
    objectFit: 'contain',
    marginBottom: 6,
  },
  providerName: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },
  textMuted: {
    color: '#64748b',
    fontSize: 8,
    marginBottom: 1.5,
  },
  metaBox: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    minWidth: 160,
    alignItems: 'flex-end',
  },
  metaBadge: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 3,
  },
  proposalNumber: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  titleSection: {
    marginVertical: 10,
  },
  projectLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#94a3b8',
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  projectSummary: {
    fontSize: 7.5,
    color: '#475569',
    marginTop: 3,
    lineHeight: 1.3,
  },
  clientBox: {
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clientLabel: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  clientName: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  table: {
    marginTop: 4,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginBottom: 3,
  },
  tableHeaderColIndex: { width: '6%', textAlign: 'center' },
  tableHeaderColDesc: { width: '56%' },
  tableHeaderColQty: { width: '10%', textAlign: 'center' },
  tableHeaderColUnit: { width: '14%', textAlign: 'right' },
  tableHeaderColTotal: { width: '14%', textAlign: 'right' },
  tableHeaderText: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    borderBottomStyle: 'solid',
  },
  itemDesc: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  itemDetails: {
    fontSize: 7,
    color: '#64748b',
    marginTop: 1.5,
    lineHeight: 1.25,
  },
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  totalsBox: {
    width: 200,
    padding: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
    fontSize: 8,
  },
  totalsGrandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
  },
  conditionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 8,
  },
  conditionCard: {
    flex: 1,
    padding: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  conditionTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  conditionText: {
    fontSize: 7,
    color: '#475569',
  },
  pixBox: {
    padding: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 8,
  },
  notesBox: {
    padding: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 14,
  },
  notesTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  notesContent: {
    fontSize: 7,
    color: '#475569',
    lineHeight: 1.25,
  },
  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 6,
  },
  sigBlock: {
    width: '40%',
    alignItems: 'center',
  },
  sigLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#94a3b8',
    borderBottomStyle: 'solid',
    marginBottom: 3,
  },
  sigName: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  sigRole: {
    fontSize: 7,
    color: '#64748b',
  },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    borderTopStyle: 'solid',
    paddingTop: 5,
    fontSize: 6.5,
    color: '#94a3b8',
  },
});

interface ProposalPdfDocumentProps {
  proposal: ProposalData;
}

export const ProposalPdfDocument: React.FC<ProposalPdfDocumentProps> = ({ proposal }) => {
  const isMinimalist = proposal.theme === 'minimalist';
  const primaryColor = isMinimalist
    ? '#09090b'
    : proposal.provider.primaryColor || '#1e3a8a';

  const subtotal = calculateSubtotal(proposal.items);
  const discountAmount = calculateDiscountAmount(
    subtotal,
    proposal.discount,
    proposal.discountType
  );
  const grandTotal = calculateTotal(subtotal, discountAmount);

  return (
    <Document title={`Proposta-${proposal.proposalNumber}-${proposal.client.name}`} author={proposal.provider.name}>
      <Page size="A4" style={styles.page}>
        {/* Accent Bar */}
        <View
          style={[
            styles.accentBar,
            { backgroundColor: primaryColor },
          ]}
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.providerInfo}>
            {proposal.provider.logo ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={proposal.provider.logo} style={styles.logo} />
            ) : (
              <Text style={[styles.providerName, { color: primaryColor }]}>
                {proposal.provider.name || 'Nome do Prestador'}
              </Text>
            )}

            {proposal.provider.logo && (
              <Text style={styles.providerName}>
                {proposal.provider.name || 'Nome do Prestador'}
              </Text>
            )}

            {proposal.provider.document ? (
              <Text style={styles.textMuted}>CNPJ/CPF: {proposal.provider.document}</Text>
            ) : null}
            {proposal.provider.email ? (
              <Text style={styles.textMuted}>E-mail: {proposal.provider.email}</Text>
            ) : null}
            {proposal.provider.phone ? (
              <Text style={styles.textMuted}>Tel: {proposal.provider.phone}</Text>
            ) : null}
            {proposal.provider.address ? (
              <Text style={styles.textMuted}>{proposal.provider.address}</Text>
            ) : null}
            {proposal.provider.website ? (
              <Text style={styles.textMuted}>{proposal.provider.website}</Text>
            ) : null}
          </View>

          {/* Proposal Meta Box */}
          <View
            style={[
              styles.metaBox,
              {
                backgroundColor: isMinimalist ? '#fafafa' : '#f8fafc',
                borderColor: isMinimalist ? '#e4e4e7' : '#e2e8f0',
              },
            ]}
          >
            <Text
              style={[
                styles.metaBadge,
                {
                  backgroundColor: isMinimalist ? '#f4f4f5' : `${primaryColor}15`,
                  color: primaryColor,
                },
              ]}
            >
              Proposta Comercial
            </Text>
            <Text style={styles.proposalNumber}>#{proposal.proposalNumber || 'PROP-001'}</Text>
            <Text style={styles.textMuted}>Emissão: {formatDate(proposal.issueDate)}</Text>
            <Text style={styles.textMuted}>Validade: {proposal.conditions.validityDays} dias</Text>
          </View>
        </View>

        {/* Title & Summary */}
        <View style={styles.titleSection}>
          <Text style={styles.projectLabel}>Projeto / Escopo</Text>
          <Text style={styles.projectTitle}>
            {proposal.title || 'Prestação de Serviços Profissionais'}
          </Text>
          {proposal.projectSummary ? (
            <Text style={styles.projectSummary}>{proposal.projectSummary}</Text>
          ) : null}
        </View>

        {/* Client Box */}
        <View
          style={[
            styles.clientBox,
            {
              backgroundColor: isMinimalist ? '#ffffff' : '#f8fafc',
              borderColor: isMinimalist ? '#09090b' : '#e2e8f0',
            },
          ]}
        >
          <View style={{ maxWidth: '60%' }}>
            <Text style={[styles.clientLabel, { color: primaryColor }]}>Destinatário / Cliente</Text>
            <Text style={styles.clientName}>{proposal.client.name || 'Nome do Cliente'}</Text>
            {proposal.client.contactRole ? (
              <Text style={styles.textMuted}>{proposal.client.contactRole}</Text>
            ) : null}
            {proposal.client.companyName ? (
              <Text style={[styles.textMuted, { fontFamily: 'Helvetica-Bold' }]}>
                {proposal.client.companyName}
              </Text>
            ) : null}
            {proposal.client.document ? (
              <Text style={styles.textMuted}>CNPJ/CPF: {proposal.client.document}</Text>
            ) : null}
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {proposal.client.email ? (
              <Text style={styles.textMuted}>{proposal.client.email}</Text>
            ) : null}
            {proposal.client.phone ? (
              <Text style={styles.textMuted}>{proposal.client.phone}</Text>
            ) : null}
            {proposal.client.address ? (
              <Text style={styles.textMuted}>{proposal.client.address}</Text>
            ) : null}
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View
            style={[
              styles.tableHeader,
              {
                backgroundColor: primaryColor,
              },
            ]}
          >
            <View style={styles.tableHeaderColIndex}>
              <Text style={styles.tableHeaderText}>#</Text>
            </View>
            <View style={styles.tableHeaderColDesc}>
              <Text style={styles.tableHeaderText}>Descrição do Serviço / Produto</Text>
            </View>
            <View style={styles.tableHeaderColQty}>
              <Text style={styles.tableHeaderText}>Qtd</Text>
            </View>
            <View style={styles.tableHeaderColUnit}>
              <Text style={styles.tableHeaderText}>Unitário</Text>
            </View>
            <View style={styles.tableHeaderColTotal}>
              <Text style={styles.tableHeaderText}>Total</Text>
            </View>
          </View>

          {proposal.items.map((item, index) => {
            const itemTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
            const isEven = index % 2 === 0;

            return (
              <View
                key={item.id || index}
                style={[
                  styles.tableRow,
                  {
                    backgroundColor: isEven
                      ? '#ffffff'
                      : isMinimalist
                      ? '#fcfcfc'
                      : '#f8fafc',
                  },
                ]}
              >
                <View style={styles.tableHeaderColIndex}>
                  <Text style={{ fontSize: 7.5, color: '#94a3b8' }}>{index + 1}</Text>
                </View>
                <View style={styles.tableHeaderColDesc}>
                  <Text style={styles.itemDesc}>{item.description || 'Item'}</Text>
                  {item.details ? (
                    <Text style={styles.itemDetails}>{item.details}</Text>
                  ) : null}
                </View>
                <View style={styles.tableHeaderColQty}>
                  <Text style={{ fontSize: 7.5, textAlign: 'center' }}>{item.quantity}</Text>
                </View>
                <View style={styles.tableHeaderColUnit}>
                  <Text style={{ fontSize: 7.5, textAlign: 'right' }}>
                    {formatCurrency(item.unitPrice, proposal.currency)}
                  </Text>
                </View>
                <View style={styles.tableHeaderColTotal}>
                  <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', textAlign: 'right', color: '#0f172a' }}>
                    {formatCurrency(itemTotal, proposal.currency)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Totals Section */}
        <View style={styles.totalsContainer}>
          <View
            style={[
              styles.totalsBox,
              {
                backgroundColor: isMinimalist ? '#fafafa' : '#f8fafc',
                borderColor: isMinimalist ? '#e4e4e7' : '#e2e8f0',
              },
            ]}
          >
            <View style={styles.totalsRow}>
              <Text style={{ color: '#64748b' }}>Subtotal:</Text>
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                {formatCurrency(subtotal, proposal.currency)}
              </Text>
            </View>
            {discountAmount > 0 ? (
              <View style={styles.totalsRow}>
                <Text style={{ color: '#059669' }}>
                  Desconto {proposal.discountType === 'percentage' ? `(${proposal.discount}%)` : ''}:
                </Text>
                <Text style={{ color: '#059669', fontFamily: 'Helvetica-Bold' }}>
                  - {formatCurrency(discountAmount, proposal.currency)}
                </Text>
              </View>
            ) : null}
            <View
              style={[
                styles.totalsGrandRow,
                {
                  borderTopColor: isMinimalist ? '#09090b' : '#cbd5e1',
                  color: primaryColor,
                },
              ]}
            >
              <Text>Total da Proposta:</Text>
              <Text>{formatCurrency(grandTotal, proposal.currency)}</Text>
            </View>
          </View>
        </View>

        {/* Conditions */}
        <View style={styles.conditionsGrid}>
          <View
            style={[
              styles.conditionCard,
              {
                backgroundColor: isMinimalist ? '#ffffff' : '#f8fafc',
                borderColor: isMinimalist ? '#e4e4e7' : '#e2e8f0',
              },
            ]}
          >
            <Text style={[styles.conditionTitle, { color: primaryColor }]}>Prazo de Execução</Text>
            <Text style={styles.conditionText}>{proposal.conditions.deliveryTime || 'A combinar'}</Text>
          </View>

          <View
            style={[
              styles.conditionCard,
              {
                backgroundColor: isMinimalist ? '#ffffff' : '#f8fafc',
                borderColor: isMinimalist ? '#e4e4e7' : '#e2e8f0',
              },
            ]}
          >
            <Text style={[styles.conditionTitle, { color: primaryColor }]}>Forma de Pagamento</Text>
            <Text style={styles.conditionText}>{proposal.conditions.paymentMethod || 'A combinar'}</Text>
          </View>
        </View>

        {/* PIX Details */}
        {(proposal.provider.pixKey || proposal.provider.bankInfo) ? (
          <View
            style={[
              styles.pixBox,
              {
                backgroundColor: isMinimalist ? '#fafafa' : '#f0fdf4',
                borderColor: isMinimalist ? '#e4e4e7' : '#bbf7d0',
              },
            ]}
          >
            <Text style={[styles.conditionTitle, { color: isMinimalist ? primaryColor : '#166534' }]}>
              Dados para Pagamento / Chave PIX:
            </Text>
            {proposal.provider.pixKey ? (
              <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#0f172a' }}>
                PIX: {proposal.provider.pixKey}
              </Text>
            ) : null}
            {proposal.provider.bankInfo ? (
              <Text style={styles.conditionText}>{proposal.provider.bankInfo}</Text>
            ) : null}
          </View>
        ) : null}

        {/* Notes */}
        {proposal.conditions.notes ? (
          <View
            style={[
              styles.notesBox,
              {
                backgroundColor: isMinimalist ? '#ffffff' : '#f8fafc',
                borderColor: isMinimalist ? '#e4e4e7' : '#e2e8f0',
              },
            ]}
          >
            <Text style={[styles.notesTitle, { color: primaryColor }]}>
              Termos Gerais & Cláusulas de Aceite
            </Text>
            <Text style={styles.notesContent}>{proposal.conditions.notes}</Text>
          </View>
        ) : null}

        {/* Signatures */}
        <View style={styles.signatures}>
          <View style={styles.sigBlock}>
            <View style={styles.sigLine} />
            <Text style={styles.sigName}>{proposal.provider.name || 'Prestador'}</Text>
            <Text style={styles.sigRole}>Contratado(a)</Text>
          </View>
          <View style={styles.sigBlock}>
            <View style={styles.sigLine} />
            <Text style={styles.sigName}>{proposal.client.name || 'Cliente'}</Text>
            <Text style={styles.sigRole}>
              {proposal.client.companyName ? proposal.client.companyName : 'Contratante'}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Documento gerado via PropostaPRO • Confidencial</Text>
          <Text>Página 1 de 1</Text>
        </View>
      </Page>
    </Document>
  );
};
