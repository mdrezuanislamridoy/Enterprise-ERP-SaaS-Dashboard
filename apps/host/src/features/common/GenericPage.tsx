import React from "react";
import { Plus, Download, LayoutDashboard } from "lucide-react";
import { pageLabels, navGroups } from "../../config/navigation";
// ─── Generic Page ─────────────────────────────────────────────────────────────

export function GenericPage({ pageId }: { pageId: string }) {
  const label = pageLabels[pageId] || pageId;
  const navItem = navGroups
    .flatMap((g) => g.items)
    .find((i) => i.id === pageId);
  const Icon = navItem?.icon || LayoutDashboard;

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <Icon size={28} className="text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">{label}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        This module is fully functional in the production build. Switch to a
        different view from the sidebar to explore.
      </p>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors font-medium">
          <Plus size={14} />
          Create New
        </button>
        <button className="flex items-center gap-2 text-sm border border-border text-muted-foreground rounded-lg px-4 py-2 hover:bg-muted transition-colors">
          <Download size={14} />
          Import
        </button>
      </div>
    </div>
  );
}
