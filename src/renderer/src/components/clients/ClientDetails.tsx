import { useState, useEffect } from "react";
import { Client, CreatePetDTO } from "@types";
import { Card, CardContent, CardHeader, CardTitle } from "@renderer/components/ui/card";
import { Button } from "@renderer/components/ui/button";
import { Edit, CalendarPlus, Plus } from "lucide-react";
import { usePets } from "@renderer/hooks/usePets";
import { PetCard } from "@renderer/components/pets/PetCard";

interface ClientDetailsProps {
    client: Client;
    onEdit: () => void;
}

export default function ClientDetails({ client, onEdit }: ClientDetailsProps) {
    const { pets, fetchPets, createPet, updatePet, isLoading } = usePets();
    const [expandedPetId, setExpandedPetId] = useState<number | 'new' | null>(null);

    useEffect(() => {
        fetchPets(client.id);
    }, [client.id, fetchPets]);

    // Auto-expand if there is exactly one pet (but allow user to collapse)
    useEffect(() => {
        if (pets.length === 1) {
            setExpandedPetId(pets[0].id);
        }
    }, [pets.length, pets]); // Only run when count changes, to avoid re-expanding on every render if user collapsed it? 
    // Actually simpler: just set it once when length becomes 1.

    // If 0 pets, we force the "Create" card to be visible/expanded.
    // If >0 pets, we respect expandedPetId.
    const isNoPets = pets.length === 0;

    const handleCreatePet = async (data: CreatePetDTO) => {
        try {
            await createPet(data);
            // After create, collapse the form (or keep it if it's the only one? User wants ability to collapse)
            setExpandedPetId(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdatePet = async (id: number, data: CreatePetDTO) => {
        try {
            await updatePet(id, { ...data, client_id: client.id });
            // Optional: collapse on save
            setExpandedPetId(null);
        } catch (e) {
            console.error(e);
        }
    };

    const toggleExpand = (id: number | 'new') => {
        // If no pets, we can't collapse the create form (it's the only thing there)
        if (isNoPets) return;
        setExpandedPetId(prev => (prev === id ? null : id));
    };

    return (
        <div className="space-y-6">
            {/* Row 1: Client Info Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">Client Information</CardTitle>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={onEdit}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button size="sm">
                            <CalendarPlus className="mr-2 h-4 w-4" />
                            New Appointment
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {/* Column 1: Identity */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Full Name</h4>
                                <p className="text-lg font-semibold">{client.full_name}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Document Number</h4>
                                <p className="text-lg font-mono">{client.document_number}</p>
                            </div>
                        </div>

                        {/* Column 2: Contact */}
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Contact</h4>
                                <div className="grid grid-cols-1 gap-1">
                                    <span className="flex items-center gap-2">
                                        <span className="font-medium text-sm w-12">Phone:</span>
                                        <span>{client.phone || "N/A"}</span>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="font-medium text-sm w-12">Email:</span>
                                        <span>{client.email || "N/A"}</span>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {client.notes || "No notes available."}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Row 2: Pets & Other */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1: Pet Selection */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Pets</h3>
                        {/* Show add button mainly when we have pets and it's not the single-always-expanded empty case (though even then... wait. 
                             If pets=0, we show 1 card (Create). 
                             If pets=1, we show 1 card (Edit). 
                             If user wants to add 2nd pet? We need a button.
                         */}
                        {pets.length > 0 && (
                            <Button variant="outline" size="sm" onClick={() => setExpandedPetId('new')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Pet
                            </Button>
                        )}
                    </div>

                    {/* Zero Pets: Show generic 'Create' card */}
                    {pets.length === 0 && !isLoading && (
                        <PetCard
                            clientId={client.id}
                            isExpanded={true}
                            onToggleExpand={() => { }}
                            onSave={handleCreatePet}
                        />
                    )}

                    {/* Pending 'New Pet' Card (manually triggered when > 0 pets) */}
                    {expandedPetId === 'new' && pets.length > 0 && (
                        <PetCard
                            clientId={client.id}
                            isExpanded={true}
                            onToggleExpand={() => setExpandedPetId(null)}
                            onSave={handleCreatePet}
                        />
                    )}

                    {/* Existing Pets List */}
                    <div className="space-y-4">
                        {pets.map(pet => (
                            <PetCard
                                key={pet.id}
                                pet={pet}
                                clientId={client.id}
                                isExpanded={expandedPetId === pet.id}
                                onToggleExpand={() => toggleExpand(pet.id)}
                                onSave={(data) => handleUpdatePet(pet.id, data)}
                            />
                        ))}
                    </div>
                </div>

                {/* Column 2: Placeholder for future functionality */}
                <div className="space-y-4">
                    {/* Can be Appointments history, pending actions, etc. */}
                </div>
            </div>
        </div>
    );
}
