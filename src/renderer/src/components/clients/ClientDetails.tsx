import { useState, useEffect } from 'react'
import { Client, CreatePetDTO } from '@types'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { Edit, CalendarPlus, Plus, Filter } from 'lucide-react'
import { usePets } from '@renderer/hooks/usePets'
import { PetCard } from '@renderer/components/pets/PetCard'
import { useAppointments } from '@renderer/hooks/useAppointments'

interface ClientDetailsProps {
  client: Client
  onEdit: () => void
}

export default function ClientDetails({ client, onEdit }: ClientDetailsProps) {
  const { pets, fetchPets, createPet, updatePet, isLoading } = usePets()
  const {
    appointments,
    isLoading: isLoadingAppointments,
    fetchAppointmentsByPet
  } = useAppointments()
  const [expandedPetId, setExpandedPetId] = useState<number | 'new' | null>(null)

  useEffect(() => {
    if (expandedPetId && expandedPetId !== 'new') {
      fetchAppointmentsByPet(expandedPetId)
    }
  }, [expandedPetId, fetchAppointmentsByPet])

  useEffect(() => {
    fetchPets(client.id)
  }, [client.id, fetchPets])

  // Auto-expand if there is exactly one pet (but allow user to collapse)
  useEffect(() => {
    if (pets.length === 1) {
      setExpandedPetId(pets[0].id)
    }
  }, [pets.length, pets]) // Only run when count changes, to avoid re-expanding on every render if user collapsed it?
  // Actually simpler: just set it once when length becomes 1.

  // If 0 pets, we force the "Create" card to be visible/expanded.
  // If >0 pets, we respect expandedPetId.
  const isNoPets = pets.length === 0

  const handleCreatePet = async (data: CreatePetDTO) => {
    try {
      await createPet(data)
      // After create, collapse the form (or keep it if it's the only one? User wants ability to collapse)
      setExpandedPetId(null)
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdatePet = async (id: number, data: CreatePetDTO) => {
    try {
      await updatePet(id, { ...data, client_id: client.id })
      // Optional: collapse on save
      setExpandedPetId(null)
    } catch (e) {
      console.error(e)
    }
  }

  const toggleExpand = (id: number | 'new') => {
    // If no pets, we can't collapse the create form (it's the only thing there)
    if (isNoPets) return
    setExpandedPetId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6">
      {/* Row 1: Client Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Información del Cliente</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button size="sm">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Column 1: Identity */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Nombre Completo</h4>
                <p className="text-lg font-semibold">{client.full_name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Número de Documento</h4>
                <p className="text-lg font-mono">{client.document_number}</p>
              </div>
            </div>

            {/* Column 2: Contact */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Contacto</h4>
                <div className="grid grid-cols-1 gap-1">
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-sm w-12">Tel:</span>
                    <span>{client.phone || 'N/A'}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-sm w-12">Email:</span>
                    <span>{client.email || 'N/A'}</span>
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Notas</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {client.notes || 'No hay notas disponibles.'}
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
            <h3 className="text-lg font-semibold">Mascotas</h3>
            {pets.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => setExpandedPetId('new')}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Mascota
              </Button>
            )}
          </div>

          {/* Zero Pets: Show generic 'Create' card */}
          {pets.length === 0 && !isLoading && (
            <PetCard
              clientId={client.id}
              isExpanded={true}
              onToggleExpand={() => {}}
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
            {pets.map((pet) => (
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

        {/* Column 2: Appointments List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {/* Show name if pet selected, otherwise generic title */}
              {expandedPetId && expandedPetId !== 'new'
                ? `Turnos de ${pets.find((p) => p.id === expandedPetId)?.name}`
                : 'Turnos'}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                disabled={!expandedPetId || expandedPetId === 'new'}
              >
                <Filter className="mr-2 h-3 w-3" />
                Filtrar
              </Button>
              <select
                className="h-8 rounded-md border border-input bg-background px-3 text-xs disabled:opacity-50"
                disabled={!expandedPetId || expandedPetId === 'new'}
              >
                <option>Más recientes</option>
                <option>Más antiguos</option>
              </select>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="rounded-md border bg-background">
            <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted/40 text-xs font-medium text-muted-foreground">
              <div className="col-span-4">Fecha y Hora</div>
              <div className="col-span-5">Servicios</div>
              <div className="col-span-3">Estado</div>
            </div>

            {/* Content Area based on selection */}
            {expandedPetId && expandedPetId !== 'new' ? (
              isLoadingAppointments ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  Cargando turnos...
                </div>
              ) : appointments.length > 0 ? (
                <div className="max-h-100 overflow-y-auto">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="grid grid-cols-12 gap-2 p-3 border-b last:border-0 text-sm hover:bg-muted/50 transition-colors"
                    >
                      <div className="col-span-4 font-medium truncate">
                        {new Date(apt.date).toLocaleDateString()}{' '}
                        <span className="text-muted-foreground ml-1">{apt.start_time}</span>
                      </div>
                      <div className="col-span-5 text-muted-foreground">-</div>
                      <div className="col-span-3">
                        <span>{apt.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  No hay turnos registrados.
                </div>
              )
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <CalendarPlus className="h-8 w-8 opacity-20" />
                  <span>Seleccione una mascota para visualizar sus turnos.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
