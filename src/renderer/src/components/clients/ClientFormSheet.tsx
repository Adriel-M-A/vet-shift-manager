import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Client } from "@types";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@renderer/components/ui/sheet";
import { Button } from "@renderer/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@renderer/components/ui/form";
import { Input } from "@renderer/components/ui/input";
import { Textarea } from "@renderer/components/ui/textarea";
import { clientSchema, ClientFormValues } from "@renderer/schemas/client.schema";


interface ClientFormSheetProps {
    isOpen: boolean;
    onClose: () => void;
    clientToEdit?: Client | null;
    onSuccess: () => void;
}

export default function ClientFormSheet({
    isOpen,
    onClose,
    clientToEdit,
    onSuccess,
}: ClientFormSheetProps) {


    const form = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            full_name: "",
            document_number: "",
            phone: "",
            email: "",
            notes: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            if (clientToEdit) {
                form.reset({
                    full_name: clientToEdit.full_name,
                    document_number: clientToEdit.document_number,
                    phone: clientToEdit.phone || "",
                    email: clientToEdit.email || "",
                    notes: clientToEdit.notes || "",
                });
            } else {
                form.reset({
                    full_name: "",
                    document_number: "",
                    phone: "",
                    email: "",
                    notes: "",
                });
            }
        }
    }, [isOpen, clientToEdit, form]);

    const onSubmit = async (values: ClientFormValues) => {
        // In a real implementation this would call create or update
        // For now we use the hook's placeholder or call API directly
        console.log("Submitting:", values);

        try {
            await window.api.clients.create({
                full_name: values.full_name,
                document_number: values.document_number,
                phone: values.phone,
                email: values.email || undefined,
                notes: values.notes,
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to save client", error);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>
                        {clientToEdit ? "Editar Cliente" : "Crear Cliente"}
                    </SheetTitle>
                    <SheetDescription>
                        {clientToEdit
                            ? "Realice cambios en el perfil del cliente aquí."
                            : "Agregue un nuevo cliente al sistema."}
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre Completo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Juan Pérez" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="document_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número de Documento</FormLabel>
                                    <FormControl>
                                        <Input placeholder="12345678" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1 234 567 890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="juan@ejemplo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notas</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Cualquier nota adicional..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit">Guardar</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
