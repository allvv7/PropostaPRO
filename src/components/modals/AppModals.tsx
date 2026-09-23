'use client';

import React from 'react';
import { useLicense } from '@/context/LicenseContext';
import { WelcomeModal } from './WelcomeModal';
import { LicenseModal } from './LicenseModal';
import { FaqModal } from './FaqModal';
import { SummaryPrintModal } from './SummaryPrintModal';

export const AppModals: React.FC = () => {
  const {
    isWelcomeOpen,
    setIsWelcomeOpen,
    isLicenseModalOpen,
    setIsLicenseModalOpen,
    isFaqOpen,
    setIsFaqOpen,
    isSummaryOpen,
    setIsSummaryOpen,
    licenseKey,
    isLicensed,
    saveLicense,
    removeLicense,
  } = useLicense();

  return (
    <>
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
      />

      <FaqModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
      />

      <SummaryPrintModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />

      <LicenseModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        licenseKey={licenseKey}
        isLicensed={isLicensed}
        onSaveLicense={saveLicense}
        onRemoveLicense={removeLicense}
      />
    </>
  );
};
