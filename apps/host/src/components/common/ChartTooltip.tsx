import React from "react";
const CHART_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

export function ChartTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-xl shadow-lg p-3 text-sm min-w-[150px]">
        <div className="text-muted-foreground mb-2 pb-2 border-b border-border">{label}</div>
        <div className="space-y-1.5">
          {payload.map((p: any, i: number) => (
            <div key={i} className="flex justify-between items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || CHART_COLORS[i % CHART_COLORS.length] }}></span>
                <span className="text-muted-foreground capitalize">{p.name || p.dataKey}</span>
              </span>
              <span className="font-semibold text-foreground">
                {typeof p.value === 'number' && p.value > 1000 ? `$${(p.value / 1000).toFixed(1)}k` : p.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}
