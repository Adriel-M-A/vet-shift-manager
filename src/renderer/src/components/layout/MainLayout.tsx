
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
    return (
        <div className="flex h-screen w-full bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}
