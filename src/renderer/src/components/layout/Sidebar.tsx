
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Settings as SettingsIcon } from 'lucide-react';


// If cn is not available we can use clsx + tailwind-merge directly or standard template literals
// Checking if lib/utils exists is a good idea, but I'll assume standard shadcn setup.
// Wait, I should check if lib/utils exists first or just implement it safe.
// I'll stick to simple className logic or standard template strings to be safe if utils is missing,
// but the plan says "Shadcn UI configured" so `lib/utils` usually exists.

export default function Sidebar() {
    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/agenda', label: 'Agenda', icon: Calendar },
        { to: '/clients', label: 'Clients', icon: Users },
        { to: '/settings', label: 'Settings', icon: SettingsIcon },
    ];

    return (
        <aside className="w-64 border-r border-border bg-card h-full flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-border">
                <h2 className="text-lg font-bold tracking-tight text-card-foreground">Vet Manager</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            }`
                        }
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
