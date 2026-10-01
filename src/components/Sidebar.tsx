import { LayoutDashboard, MessageSquare, BarChart3, BookOpen, Settings, Sparkles } from 'lucide-react';
import type { View } from '@/types';

interface SidebarProps {
  current: View;
  onNavigate: (view: View) => void;
}

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'conversations', label: 'Conversations', icon: MessageSquare },
  { id: 'insights', label: 'AI Insights', icon: BarChart3 },
  { id: 'knowledge', label: 'Knowledge Sources', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ current, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">AI Copilot</h1>
            <p className="text-[11px] text-gray-500 leading-tight">Support Assistant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-[18px] h-[18px] ${active ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-semibold">
            AM
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Alex Morgan</p>
            <p className="text-[11px] text-gray-500 truncate">Support Agent</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
