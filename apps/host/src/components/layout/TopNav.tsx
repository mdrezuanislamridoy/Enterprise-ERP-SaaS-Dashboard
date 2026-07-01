import React from "react";
import { Menu, Search, Moon, Sun, Bell, ChevronDown } from "lucide-react";
import { pageLabels } from "../../config/navigation";

export function TopNav({
  onToggleSidebar,
  darkMode,
  onToggleDark,
  onOpenCmd,
  activePage,
  notifOpen,
  setNotifOpen,
}: {
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
  onOpenCmd: () => void;
  activePage: string;
  notifOpen: boolean;
  setNotifOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 -ml-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 ring-primary/50">
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-foreground tracking-tight hidden sm:block">
          {pageLabels[activePage] || activePage}
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={onOpenCmd} className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 hover:bg-muted border border-transparent hover:border-border px-3 py-1.5 rounded-lg transition-all">
          <Search size={14} />
          <span>Search...</span>
          <kbd className="hidden lg:inline-flex bg-background border border-border rounded px-1.5 py-0.5 text-[10px] font-mono ml-4">⌘K</kbd>
        </button>
        <button onClick={onOpenCmd} className="sm:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Search size={18} />
        </button>

        <div className="w-px h-6 bg-border mx-1"></div>

        <button onClick={onToggleDark} className="p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus:outline-none focus:ring-2 ring-primary/50 relative overflow-hidden">
          <div className={`transition-transform duration-500 ${darkMode ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}>
            <Moon size={18} />
          </div>
          <div className={`absolute top-2 left-2 transition-transform duration-500 ${darkMode ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
            <Sun size={18} />
          </div>
        </button>
        <div className="relative">
          <button onClick={() => setNotifOpen(!notifOpen)} className="p-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors relative focus:outline-none focus:ring-2 ring-primary/50">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-2xl shadow-xl z-50 overflow-hidden transform origin-top-right transition-all">
              <div className="px-4 py-3 border-b border-border bg-muted/30 flex justify-between items-center">
                <span className="font-semibold text-sm text-foreground">Notifications</span>
                <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                    <div>
                      <div className="text-sm font-medium text-foreground">System Update Complete</div>
                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">The latest database migration has been completed successfully without any downtime.</div>
                      <div className="text-[10px] text-muted-foreground mt-1.5 uppercase font-semibold">2 hours ago</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-muted/30 border-t border-border text-center">
                <button className="text-xs text-primary font-medium hover:underline">View All Notifications</button>
              </div>
            </div>
          )}
        </div>
        <button className="flex items-center gap-2 ml-1 p-1 pr-3 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-inner">
            <span className="text-white text-xs font-bold">AK</span>
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-medium text-foreground leading-none">Alex Kirby</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
          <ChevronDown size={13} className="text-muted-foreground hidden md:block" />
        </button>
      </div>
    </header>
  );
}
