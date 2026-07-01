import React, { useState } from "react";
import {
  TrendingUp, AlertCircle, Zap,Brain, Database,
} from "lucide-react";

import { cn } from "../../lib/utils";

// ─── AI Insights Page ─────────────────────────────────────────────────────────

export function AIInsightsPage() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/ai/insights')
      .then(res => res.json())
      .then(d => {
        // Map string icons back to lucide components
        const iconMap: Record<string, any> = {
          TrendingUp, AlertCircle, Database, Zap
        };
        const mapped = (d.insights || []).map((i: any) => ({
          ...i,
          icon: iconMap[i.icon] || Brain
        }));
        setInsights(mapped);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'ai', text: string }[]>([
    { sender: 'ai', text: 'Hello! I am NexusAI. How can I help you analyze your ERP data today?' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatLog(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatMessage("");
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setChatLog(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch {
      setChatLog(prev => [...prev, { sender: 'ai', text: "Error connecting to AI service." }]);
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div>
        <h1 className="text-xl font-semibold text-foreground">AI Insights</h1>
        <p className="text-sm text-muted-foreground">
          Powered by NexusAI — last updated June 30, 2026 at 09:42
        </p>
      </div>

      {/* AI Chat */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-gradient-to-r from-indigo-600/5 to-purple-600/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              NexusAI Assistant
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Online
            </div>
          </div>
        </div>
        <div className="p-5 space-y-3 min-h-48 max-h-96 overflow-y-auto">
          {chatLog.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                  <Brain size={13} className="text-white" />
                </div>
              )}
              <div className={`${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted text-foreground rounded-tl-none'} rounded-xl px-4 py-3 text-sm max-w-lg`}>
                {msg.text}
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold">
                  ME
                </div>
              )}
            </div>
          ))}
          {chatLoading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                <Brain size={13} className="text-white" />
              </div>
              <div className="bg-muted rounded-xl rounded-tl-none px-4 py-3 text-sm flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse"></span>
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse delay-75"></span>
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-pulse delay-150"></span>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleChat} className="border-t border-border px-5 py-3 flex gap-3">
          <input
            value={chatMessage}
            onChange={e => setChatMessage(e.target.value)}
            disabled={chatLoading}
            className="flex-1 bg-muted rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary/30"
            placeholder="Ask NexusAI anything..."
          />
          <button type="submit" disabled={chatLoading} className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
            Send
          </button>
        </form>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((ins, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  ins.bg,
                )}
              >
                <ins.icon size={18} className={ins.color} />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-foreground">
                  {ins.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {ins.desc}
                </div>
                <button className="mt-3 text-xs font-medium text-primary hover:underline">
                  Take action →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
