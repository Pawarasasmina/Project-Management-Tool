import { Bell, Calendar, FolderKanban, Home, Settings, Users } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/teams', label: 'Teams', icon: Users },
  { to: '/calendar', label: 'Calendar', icon: Calendar },
  { to: '/inbox', label: 'Inbox', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function AppShell() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[250px_1fr]">
      <aside className="border-r bg-white/80 p-4 backdrop-blur">
        <Link to="/dashboard" className="mb-6 block text-lg font-semibold">
          Project Manager
        </Link>
        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-slate-100 font-semibold' : 'text-slate-600'}`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
