'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const LICENSE_STORAGE_KEY = 'proposta_pro_license_key';
const ONBOARDED_STORAGE_KEY = 'proposta_pro_onboarded_v1';

interface LicenseContextType {
  licenseKey: string;
  isLicensed: boolean;
  saveLicense: (key: string) => boolean;
  removeLicense: () => void;
  isWelcomeOpen: boolean;
  setIsWelcomeOpen: (open: boolean) => void;
  isLicenseModalOpen: boolean;
  setIsLicenseModalOpen: (open: boolean) => void;
  isFaqOpen: boolean;
  setIsFaqOpen: (open: boolean) => void;
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

export function LicenseProvider({ children }: { children: React.ReactNode }) {
  const [licenseKey, setLicenseKey] = useState<string>('');
  const [isLicensed, setIsLicensed] = useState<boolean>(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState<boolean>(false);
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);

  // Validate license key format
  const validateKey = (key: string): boolean => {
    if (!key || key.trim().length < 4) return false;
    return true;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // 1. Check URL parameters
      const params = new URLSearchParams(window.location.search);
      const urlKey = params.get('key') || params.get('token') || params.get('license');

      if (urlKey && validateKey(urlKey)) {
        setLicenseKey(urlKey);
        setIsLicensed(true);
        localStorage.setItem(LICENSE_STORAGE_KEY, urlKey);
      } else {
        // 2. Load from localStorage
        const savedKey = localStorage.getItem(LICENSE_STORAGE_KEY);
        if (savedKey && validateKey(savedKey)) {
          setLicenseKey(savedKey);
          setIsLicensed(true);
        }
      }

      // 3. Check first-time welcome modal
      const onboarded = localStorage.getItem(ONBOARDED_STORAGE_KEY);
      if (!onboarded) {
        setIsWelcomeOpen(true);
      }
    } catch (e) {
      console.error('Failed to initialize license context', e);
    }
  }, []);

  const saveLicense = (key: string): boolean => {
    if (validateKey(key)) {
      setLicenseKey(key);
      setIsLicensed(true);
      localStorage.setItem(LICENSE_STORAGE_KEY, key);
      return true;
    }
    return false;
  };

  const removeLicense = () => {
    setLicenseKey('');
    setIsLicensed(false);
    localStorage.removeItem(LICENSE_STORAGE_KEY);
  };

  const handleCloseWelcome = () => {
    setIsWelcomeOpen(false);
    try {
      localStorage.setItem(ONBOARDED_STORAGE_KEY, 'true');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LicenseContext.Provider
      value={{
        licenseKey,
        isLicensed,
        saveLicense,
        removeLicense,
        isWelcomeOpen,
        setIsWelcomeOpen: (open) => {
          if (!open) {
            handleCloseWelcome();
          } else {
            setIsWelcomeOpen(true);
          }
        },
        isLicenseModalOpen,
        setIsLicenseModalOpen,
        isFaqOpen,
        setIsFaqOpen,
      }}
    >
      {children}
    </LicenseContext.Provider>
  );
}

export function useLicense() {
  const context = useContext(LicenseContext);
  if (!context) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  return context;
}
