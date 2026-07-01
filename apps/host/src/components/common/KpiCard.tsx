import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function KpiCard({
  kpi,
}: {
  kpi: {
    label: string;
    value: string;
    change: number;
    icon: any;
    colorClass: string;
    darkColorClass: string;
    border: string;
  };
}) {
  const isPos = kpi.change > 0;
  return (
    <div className={cn("bg-card rounded-2xl p-5 border-l-4 shadow-sm border border-border relative overflow-hidden group hover:shadow-md transition-shadow", kpi.border)}>
      <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm font-medium text-muted-foreground">{kpi.label}</div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", kpi.colorClass, "dark:bg-opacity-20")}>
          <kpi.icon size={20} className="opacity-90" />
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <div className="text-3xl font-bold tracking-tight text-foreground">{kpi.value}</div>
        <div className={cn("flex items-center text-xs font-semibold px-2 py-1 rounded-full", isPos ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400")}>
          {isPos ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
          {Math.abs(kpi.change)}%
        </div>
      </div>
    </div>
  );
}
