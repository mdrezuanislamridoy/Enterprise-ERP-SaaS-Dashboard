import React from "react";
import { cn } from "../../lib/utils";

export function StatusBadge({ status }: { status?: string }) {
  const safeStatus = status || "Unknown";
  const styles = {
    active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    processing: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    critical: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
    low: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    trial: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  }[safeStatus.toLowerCase()] || "bg-muted text-muted-foreground";

  return (
    <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full capitalize whitespace-nowrap", styles)}>
      {safeStatus}
    </span>
  );
}
