import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export function MrrPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch('/api/mrr').then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(console.error); }, []);

  if (loading) return <div className="p-6">Loading MRR Analysis...</div>;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><TrendingUp /> MRR Analysis</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-background rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground mb-1">Total MRR</p>
          <p className="text-3xl font-bold text-foreground">{data?.totalMrr || '$0'}</p>
        </div>
        <div className="bg-background rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground mb-1">Active Clients</p>
          <p className="text-3xl font-bold text-foreground">{data?.activeClients || 0}</p>
        </div>
        <div className="bg-background rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
          <p className="text-3xl font-bold text-foreground">{data?.totalClients || 0}</p>
        </div>
      </div>

      {data?.revenueMetrics && data.revenueMetrics.length > 0 && (
        <div className="bg-background rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border"><tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Month</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">MRR</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Costs</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">AWS</th>
            </tr></thead>
            <tbody>{data.revenueMetrics.map((m: any) => (
              <tr key={m.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-5 py-3.5 font-medium">{m.month}</td>
                <td className="px-5 py-3.5 text-emerald-600 font-semibold">${m.mrr.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-red-500">${m.costs.toLocaleString()}</td>
                <td className="px-5 py-3.5">${m.aws.toLocaleString()}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
