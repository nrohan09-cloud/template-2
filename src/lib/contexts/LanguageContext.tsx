'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'english' | 'kannada';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: {
    [key: string]: {
      english: string;
      kannada: string;
    };
  };
}

const translations = {
  'Select meal type': {
    english: 'Select meal type',
    kannada: 'ಊಟದ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
  'Choose Food Images': {
    english: 'Choose Food Images',
    kannada: 'ಆಹಾರದ ಚಿತ್ರಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
  'Choose CGM Graph': {
    english: 'Choose CGM Graph',
    kannada: 'CGM ಗ್ರಾಫ್ ಆಯ್ಕೆಮಾಡಿ',
  },
  'Upload Files': {
    english: 'Upload Files',
    kannada: 'ಫೈಲ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
  },
  'Uploading...': {
    english: 'Uploading...',
    kannada: 'ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
  },
  'Daily Timeline': {
    english: 'Daily Timeline',
    kannada: 'ದೈನಂದಿನ ಟೈಮ್‌ಲೈನ್',
  },
  'Sugar Level': {
    english: 'Sugar Level',
    kannada: 'ಸಕ್ಕರೆ ಮಟ್ಟ',
  },
  'Breakfast': {
    english: 'Breakfast',
    kannada: 'ಬೆಳಗ್ಗಿನ ಊಟ',
  },
  'Lunch': {
    english: 'Lunch',
    kannada: 'ಮಧ್ಯಾಹ್ನದ ಊಟ',
  },
  'Dinner': {
    english: 'Dinner',
    kannada: 'ರಾತ್ರಿ ಊಟ',
  },
  'Snack': {
    english: 'Snack',
    kannada: 'ತಿಂಡಿ',
  },
  'Chat': {
    english: 'Chat',
    kannada: 'ಚಾಟ್',
  },
  'Timeline': {
    english: 'Timeline',
    kannada: 'ಟೈಮ್‌ಲೈನ್',
  },
  'Language': {
    english: 'Language',
    kannada: 'ಭಾಷೆ',
  },
  'Type your message...': {
    english: 'Type your message...',
    kannada: 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
  },
  'Success': {
    english: 'Success',
    kannada: 'ಯಶಸ್ವಿ',
  },
  'Files uploaded successfully': {
    english: 'Files uploaded successfully',
    kannada: 'ಫೈಲ್‌ಗಳು ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಆಗಿವೆ',
  },
  'Error': {
    english: 'Error',
    kannada: 'ದೋಷ',
  },
  'Please select a meal type': {
    english: 'Please select a meal type',
    kannada: 'ದಯವಿಟ್ಟು ಊಟದ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
  'Please select at least one file to upload': {
    english: 'Please select at least one file to upload',
    kannada: 'ದಯವಿಟ್ಟು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕನಿಷ್ಠ ಒಂದು ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
  },
  'Upload Error': {
    english: 'Upload Error',
    kannada: 'ಅಪ್‌ಲೋಡ್ ದೋಷ',
  },
  'Failed to upload files': {
    english: 'Failed to upload files',
    kannada: 'ಫೈಲ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ',
  },
  'Employee Dashboard': {
    english: 'Employee Dashboard',
    kannada: 'ನೌಕರರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  'Search customers...': {
    english: 'Search customers...',
    kannada: 'ಗ್ರಾಹಕರನ್ನು ಹುಡುಕಿ...',
  },
  'Select a customer to view their details': {
    english: 'Select a customer to view their details',
    kannada: 'ಗ್ರಾಹಕರ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಗ್ರಾಹಕರನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
  'Data': {
    english: 'Data',
    kannada: 'ಡೇಟಾ',
  },
  'Sugar Level Readings': {
    english: 'Sugar Level Readings',
    kannada: 'ಸಕ್ಕರೆ ಮಟ್ಟದ ಓದುವಿಕೆಗಳು',
  },
  'Admin Dashboard': {
    english: 'Admin Dashboard',
    kannada: 'ನಿರ್ವಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  },
  'Employees': {
    english: 'Employees',
    kannada: 'ನೌಕರರು',
  },
  'Customers': {
    english: 'Customers',
    kannada: 'ಗ್ರಾಹಕರು',
  },
  'Employee Performance': {
    english: 'Employee Performance',
    kannada: 'ನೌಕರರ ಕಾರ್ಯಕ್ಷಮತೆ',
  },
  'Total Chats': {
    english: 'Total Chats',
    kannada: 'ಒಟ್ಟು ಚಾಟ್‌ಗಳು',
  },
  'Avg. Response Time': {
    english: 'Avg. Response Time',
    kannada: 'ಸರಾಸರಿ ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ',
  },
  'Customers Helped': {
    english: 'Customers Helped',
    kannada: 'ಸಹಾಯ ಮಾಡಿದ ಗ್ರಾಹಕರು',
  },
  'Recent Actions': {
    english: 'Recent Actions',
    kannada: 'ಇತ್ತೀಚಿನ ಕ್ರಿಯೆಗಳು',
  },
  'Select a customer to view their details and chat history': {
    english: 'Select a customer to view their details and chat history',
    kannada: 'ಗ್ರಾಹಕರ ವಿವರಗಳು ಮತ್ತು ಚಾಟ್ ಇತಿಹಾಸವನ್ನು ವೀಕ್ಷಿಸಲು ಗ್ರಾಹಕರನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
  'Customer View': {
    english: 'Customer View',
    kannada: 'ಗ್ರಾಹಕರ ನೋಟ',
  },
  'Employee View': {
    english: 'Employee View',
    kannada: 'ನೌಕರರ ನೋಟ',
  },
  'Admin View': {
    english: 'Admin View',
    kannada: 'ನಿರ್ವಾಹಕರ ನೋಟ',
  },
  'Health Monitor': {
    english: 'Alamirap',
    kannada: 'ಆಲಮಿರಪ್',
  },
  'Customer': {
    english: 'Customer',
    kannada: 'ಗ್ರಾಹಕ',
  },
  'Employee': {
    english: 'Employee',
    kannada: 'ನೌಕರ',
  },
  'Admin': {
    english: 'Admin',
    kannada: 'ನಿರ್ವಾಹಕ',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('english');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation(key: string) {
  const { language, translations } = useLanguage();
  return translations[key]?.[language] || key;
} 