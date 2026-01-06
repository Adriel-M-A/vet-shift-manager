import { Client } from "@types";
import { Card, CardContent, CardHeader, CardTitle } from "@renderer/components/ui/card";
import { Button } from "@renderer/components/ui/button";
import { Edit, CalendarPlus } from "lucide-react";

interface ClientDetailsProps {
    client: Client;
    onEdit: () => void;
}

export default function ClientDetails({ client, onEdit }: ClientDetailsProps) {
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

            {/* Row 2: Pets (Placeholder) */}
            <Card>
                <CardHeader>
                    <CardTitle>Pets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        Pets implementation pending...
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
