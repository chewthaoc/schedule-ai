'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#2C1810',
          border: '1px solid #D7CCC8',
          borderRadius: '8px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: '#2E7D32',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#C62828',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
