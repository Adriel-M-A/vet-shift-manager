
import { useState } from 'react';
import { useClients } from '@renderer/hooks/useClients';
import { Button } from '@renderer/components/ui/button';
import { Input } from '@renderer/components/ui/input';
import { Search, Plus } from 'lucide-react';
import ClientFormSheet from '@renderer/components/clients/ClientFormSheet';
import ClientDetails from '@renderer/components/clients/ClientDetails';
import { Client } from '@types';

export default function Clients() {
    const { searchByDocument, searchResult, isLoading } = useClients();
    const [documentNumber, setDocumentNumber] = useState('');
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && documentNumber) {
            searchByDocument(documentNumber);
        }
    };

    const handleCreate = () => {
        setClientToEdit(null);
        setIsSheetOpen(true);
    };

    const handleEdit = (client: Client) => {
        setClientToEdit(client);
        setIsSheetOpen(true);
    };

    const handleSuccess = () => {
        // If we just edited/created, we might want to refresh the search if it matches
        // For now, if we have a document number, re-search
        if (documentNumber) {
            searchByDocument(documentNumber);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-foreground">Clientes</h1>

                <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Buscar por número de documento..."
                            className="pl-9"
                            value={documentNumber}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                setDocumentNumber(value);
                            }}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        Crear Cliente
                    </Button>
                </div>
            </header>
            <main className="flex-1 p-6 overflow-auto">
                {isLoading ? (
                    <div className="flex justify-center p-8">Cargando...</div>
                ) : searchResult ? (
                    <ClientDetails
                        client={searchResult}
                        onEdit={() => handleEdit(searchResult)}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground pb-20">
                        <Search className="h-10 w-10 mb-4 opacity-20" />
                        <p>Busque un cliente por número de documento para ver detalles.</p>
                        <p className="text-sm mt-2">O haga clic en "Crear Cliente" para agregar uno nuevo.</p>
                    </div>
                )}
            </main>

            <ClientFormSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                clientToEdit={clientToEdit}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
