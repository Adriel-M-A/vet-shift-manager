import { useState } from 'react';
import { Client } from '@types';

export function useClients() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<Client | null>(null);

  const searchByDocument = async (documentNumber: string) => {
    setIsLoading(true);
    try {
      const response = await window.api.clients.findByDocument(documentNumber);
      setSearchResult(response.client || null);
    } catch (error) {
      console.error('Error searching client:', error);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createClient = async () => {
    // Placeholder for create client logic
    console.log('Create client clicked');
  };

  return {
    isLoading,
    searchResult,
    searchByDocument,
    createClient,
  };
}
