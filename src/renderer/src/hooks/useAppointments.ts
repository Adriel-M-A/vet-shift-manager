import { useState, useCallback } from 'react';
import { Appointment } from '@types';

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAppointmentsByPet = useCallback(async (petId: number) => {
        setIsLoading(true);
        try {
            const response = await window.api.appointments.getByPet({ petId });
            setAppointments(response.items);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setAppointments([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        appointments,
        isLoading,
        fetchAppointmentsByPet
    };
}
