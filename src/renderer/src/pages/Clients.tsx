

export default function Clients() {
    return (
        <div className="flex flex-col h-full">
            <header className="px-6 py-4 border-b border-border">
                <h1 className="text-2xl font-bold text-foreground">Clients</h1>
            </header>
            <main className="flex-1 p-6 overflow-auto">
                <p className="text-muted-foreground">Client management interface.</p>
            </main>
        </div>
    );
}
