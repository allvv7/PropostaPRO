'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { KeyRound, ShieldCheck, CheckCircle2, X, AlertCircle, Sparkles } from 'lucide-react';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenseKey: string;
  isLicensed: boolean;
  onSaveLicense: (key: string) => boolean;
  onRemoveLicense: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  isOpen,
  onClose,
  licenseKey,
  isLicensed,
  onSaveLicense,
  onRemoveLicense,
}) => {
  const [inputKey, setInputKey] = useState(licenseKey);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!inputKey.trim()) {
      setError('Por favor, informe uma chave de acesso válida.');
      return;
    }

    const valid = onSaveLicense(inputKey.trim());
    if (valid) {
      setSuccess('Licença PRO ativada com sucesso!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError('Chave de licença inválida. Verifique os caracteres informados.');
    }
  };

  const handleRemove = () => {
    if (confirm('Deseja desvincular a chave de licença atual?')) {
      onRemoveLicense();
      setInputKey('');
      setSuccess(null);
      setError(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-7 relative overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
            <KeyRound size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              Chave de Acesso / Licença
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gerencie a validação da sua licença PropostaPRO
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`p-3.5 rounded-xl border mb-5 flex items-center justify-between ${
            isLicensed
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {isLicensed ? (
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            ) : (
              <ShieldCheck size={18} className="text-slate-400 shrink-0" />
            )}
            <div>
              <span className="text-xs font-bold block">
                {isLicensed ? 'Plano PRO Ativo' : 'Versão Demonstração'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {isLicensed
                  ? 'Uso comercial completo e ilimitado'
                  : 'Insira sua chave ou acesse com link de comprador'}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleActivate} className="space-y-4">
          <div>
            <Input
              label="Chave de Licença ou Token de Acesso"
              placeholder="Ex: PRO-8492-9182-PRO"
              icon={<KeyRound size={16} />}
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              helperText="Dica: Compradores também podem acessar via link com ?key=SUA_CHAVE"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            {isLicensed ? (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleRemove}
              >
                Remover Chave
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                Fechar
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 font-semibold"
              >
                Validar Licença
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
