import React from "react";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";
import { navGroups } from "../../config/navigation";

export function Sidebar({
  collapsed,
  activePage,
  setActivePage,
  expandedGroups,
  toggleGroup,
}: {
  collapsed: boolean;
  activePage: string;
  setActivePage: (p: string) => void;
  expandedGroups: string[];
  toggleGroup: (l: string) => void;
}) {
  return (
    <aside
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300 z-20 relative shadow-sm",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-border gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-inner">
          <div className="w-5 h-5 border-4 border-white/90 rounded-sm"></div>
        </div>
        {!collapsed && (
          <div className="flex flex-col whitespace-nowrap overflow-hidden">
            <span className="font-bold text-base text-foreground tracking-tight leading-tight">NexusERP</span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Enterprise Edition</span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-6 scrollbar-hide">
        {navGroups.map((group, gIdx) => {
          const isExpanded = expandedGroups.includes(group.label || "");
          return (
            <div key={gIdx} className="space-y-1.5">
              {group.label && !collapsed && (
                <button
                  onClick={() => toggleGroup(group.label!)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  {group.label}
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
              {group.label && collapsed && (
                <div className="px-3 py-2 flex justify-center">
                  <div className="w-6 border-b-2 border-muted"></div>
                </div>
              )}
              <div
                className={cn(
                  "space-y-1 overflow-hidden transition-all duration-300",
                  !isExpanded && group.label && !collapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
                )}
              >
                {group.items.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white/20 rounded-r-md"></div>
                      )}
                      <item.icon size={18} className={cn("flex-shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                      {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border">
        <button className={cn("flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors w-full p-2 rounded-xl hover:bg-destructive/10", collapsed ? "justify-center" : "")}>
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
