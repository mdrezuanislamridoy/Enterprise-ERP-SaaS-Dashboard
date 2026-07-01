import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { navGroups } from "../../config/navigation";

export function CommandPalette({ open, onClose, setActivePage }: { open: boolean; onClose: () => void; setActivePage: (p: string) => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const allItems = navGroups.flatMap(g => g.items.map(item => ({ ...item, group: g.label || "Main" })));
  const filtered = query
    ? allItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : allItems.slice(0, 8);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages, actions, settings..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={15} />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">No results for "{query}"</div>
          ) : (
            filtered.map(item => (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent text-sm text-foreground transition-colors"
              >
                <item.icon size={15} className="text-muted-foreground" />
                <span>{item.label}</span>
                <span className="ml-auto text-xs text-muted-foreground">{item.group}</span>
              </button>
            ))
          )}
        </div>
        <div className="border-t border-border px-4 py-2 flex gap-4 text-xs text-muted-foreground">
          <span className="flex gap-1 items-center"><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">↑↓</kbd> navigate</span>
          <span className="flex gap-1 items-center"><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">↵</kbd> select</span>
          <span className="flex gap-1 items-center"><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
