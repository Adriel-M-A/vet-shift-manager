import { useState, useEffect } from 'react';
import { Pet, CreatePetDTO } from '@types';
import { Card, CardContent } from '@renderer/components/ui/card';
import { Button } from '@renderer/components/ui/button';
import { Input } from '@renderer/components/ui/input';
import { Label } from '@renderer/components/ui/label';
import {
    ChevronDown,
    ChevronUp,
    Save,
    Dog,
    Cat,
    Rabbit,
    Rat,
    PawPrint
} from 'lucide-react';

interface PetCardProps {
    pet?: Pet;
    clientId: number;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onSave: (data: CreatePetDTO) => Promise<void>;
}

export function PetCard({ pet, clientId, isExpanded, onToggleExpand, onSave }: PetCardProps) {
    const [formData, setFormData] = useState<CreatePetDTO>({
        client_id: clientId,
        name: '',
        species: 'Other', // Default to Other as requested
        breed: '',
        gender: 'male',
        age: 0,
        weight: 0,
        notes: ''
    });

    useEffect(() => {
        if (pet) {
            setFormData({
                client_id: pet.client_id,
                name: pet.name,
                species: pet.species,
                breed: pet.breed,
                gender: pet.gender || 'male',
                age: pet.age,
                weight: pet.weight,
                notes: pet.notes
            });
        }
    }, [pet]);

    const handleChange = (field: keyof CreatePetDTO, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        await onSave(formData);
    };

    const getSpeciesIcon = (species: string) => {
        switch (species) {
            case 'Dog': return <Dog className="h-8 w-8 text-primary" />;
            case 'Cat': return <Cat className="h-8 w-8 text-primary" />;
            case 'Rabbit': return <Rabbit className="h-8 w-8 text-primary" />;
            case 'Hamster': return <Rat className="h-8 w-8 text-primary" />; // Rat looks close enough
            default: return <PawPrint className="h-8 w-8 text-muted-foreground" />;
        }
    };

    // If it's a "create" card (no pet), title is different
    const isNew = !pet;

    // Determine icon based on current formData species (reactive)
    const displayIcon = getSpeciesIcon(formData.species);

    return (
        <Card className="overflow-hidden transition-all duration-200 bg-card">
            {/* Header / Summary View */}
            <div
                className={`p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 ${isExpanded ? 'border-b' : ''}`}
                onClick={onToggleExpand}
            >
                <div className="flex-1 flex items-center gap-4">
                    {/* Large Icon */}
                    <div className="shrink-0">
                        {displayIcon}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center flex-1">
                        {/* Name */}
                        <div className="font-semibold text-lg max-w-[150px] truncate">
                            {isNew ? (
                                <span className="text-muted-foreground italic">Add New Pet...</span>
                            ) : (
                                pet?.name
                            )}
                        </div>

                        {/* Species */}
                        {!isExpanded && !isNew && (
                            <div className="text-sm text-muted-foreground">
                                {pet?.species}
                            </div>
                        )}
                        {!isExpanded && isNew && (
                            <div className="text-sm text-muted-foreground">
                                -
                            </div>
                        )}

                        {/* Breed */}
                        {!isExpanded && !isNew && (
                            <div className="text-sm text-muted-foreground truncate">
                                {pet?.breed || '-'}
                            </div>
                        )}
                        {!isExpanded && isNew && (
                            <div className="text-sm text-muted-foreground">
                                -
                            </div>
                        )}

                        {/* Gender (Summary) */}
                        {!isExpanded && !isNew && (
                            <div className="text-sm text-muted-foreground capitalize">
                                {pet?.gender || '-'}
                            </div>
                        )}
                        {!isExpanded && isNew && (
                            <div className="text-sm text-muted-foreground">
                                -
                            </div>
                        )}
                    </div>
                </div>

                <Button variant="ghost" size="sm" className="ml-2">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>

            {/* Expanded Form View */}
            {isExpanded && (
                <CardContent className="p-4 bg-muted/10">
                    <div className="grid grid-cols-3 gap-4">
                        {/* Row 1 */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Pet Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="species">Species</Label>
                            <select
                                id="species"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.species}
                                onChange={(e) => handleChange('species', e.target.value)}
                            >
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Rabbit">Rabbit</option>
                                <option value="Hamster">Hamster</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <select
                                id="gender"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.gender || 'male'}
                                onChange={(e) => handleChange('gender', e.target.value)}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {/* Row 2 */}
                        <div className="space-y-2">
                            <Label htmlFor="breed">Breed</Label>
                            <Input
                                id="breed"
                                value={formData.breed || ''}
                                onChange={(e) => handleChange('breed', e.target.value)}
                                placeholder="Breed"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="age">Age (yrs)</Label>
                            <Input
                                id="age"
                                type="number"
                                value={formData.age || ''}
                                onChange={(e) => handleChange('age', Number(e.target.value))}
                                placeholder="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                value={formData.weight || ''}
                                onChange={(e) => handleChange('weight', Number(e.target.value))}
                                placeholder="0.0"
                            />
                        </div>

                        {/* Row 3 (Full width notes) */}
                    </div>
                    <div className="mt-4 space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Input
                            id="notes"
                            value={formData.notes || ''}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            placeholder="Any notes..."
                        />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button onClick={handleSave} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            {isNew ? 'Create Pet' : 'Update Pet'}
                        </Button>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
