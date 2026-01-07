import { useState, useCallback } from 'react';
import { Pet, CreatePetDTO } from '@types';

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPets = useCallback(async (clientId: number) => {
    setIsLoading(true);
    try {
      const response = await window.api.pets.getByClient({ clientId });
      setPets(response.items);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPet = async (data: CreatePetDTO) => {
    try {
      const response = await window.api.pets.create(data);
      if (response.petId) {
        // Refresh list
        await fetchPets(data.client_id);
      }
      return response;
    } catch (error) {
      console.error('Error creating pet:', error);
      throw error;
    }
  };

  const updatePet = async (id: number, data: Partial<CreatePetDTO> & { client_id: number }) => {
    try {
      await window.api.pets.update(id, data);
      await fetchPets(data.client_id);
    } catch (error) {
       console.error('Error updating pet:', error);
       throw error;
    }
  };

  return {
    pets,
    isLoading,
    fetchPets,
    createPet,
    updatePet
  };
}
