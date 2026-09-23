'use client';

import React from 'react';
import { useLicense } from '@/context/LicenseContext';
import { WelcomeModal } from './WelcomeModal';
import { LicenseModal } from './LicenseModal';

export const AppModals: React.FC = () => {
  const {
    isWelcomeOpen,
    setIsWelcomeOpen,
    isLicenseModalOpen,
    setIsLicenseModalOpen,
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
