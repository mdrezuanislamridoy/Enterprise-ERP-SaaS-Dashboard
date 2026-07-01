import React from 'react';
import { BarChart2, TrendingUp, Users } from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Analytics Module (Remote Micro-frontend)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <h3 className="text-2xl font-bold">12,450</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Revenue Growth</p>
            <h3 className="text-2xl font-bold">+24.5%</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <BarChart2 size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Sessions</p>
            <h3 className="text-2xl font-bold">3,192</h3>
          </div>
        </div>
      </div>
      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">Micro-frontend Connected Successfully!</h3>
        <p className="text-indigo-600">This component is completely isolated from the main dashboard and is being loaded dynamically at runtime via Vite Module Federation.</p>
      </div>
    </div>
  );
}
