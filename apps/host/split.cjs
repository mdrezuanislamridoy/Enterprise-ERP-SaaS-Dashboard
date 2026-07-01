const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'src/app/App.tsx');
const content = fs.readFileSync(srcFile, 'utf8');
const lines = content.split('\n');

const outDir = path.join(__dirname, 'src');

function write(filePath, startStr, endStr) {
  let start = lines.findIndex(l => l.includes(startStr));
  let end = lines.findIndex(l => l.includes(endStr));
  if (start === -1) { console.error('Not found:', startStr); return; }
  if (end === -1) end = lines.length; // till end if no endStr
  
  const chunk = lines.slice(start, end).join('\n');
  const fullPath = path.join(outDir, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, chunk, 'utf8');
}

// 1. Data
write('data/mockData.ts', '// ─── Mock Data ──', '// ─── Nav Config ──');

// 2. Config
write('config/navigation.ts', '// ─── Nav Config ──', '// ─── Helpers ──');

// 3. Lib
write('lib/utils.ts', '// ─── Helpers ──', '// ─── Status Badge ──');

// 4. Common Components
write('components/common/StatusBadge.tsx', '// ─── Status Badge ──', '// ─── Custom Tooltip ──');
write('components/common/ChartTooltip.tsx', '// ─── Custom Tooltip ──', '// ─── KPI Card ──');
write('components/common/KpiCard.tsx', '// ─── KPI Card ──', '// ─── Sidebar ──');

// 5. Layout
write('components/layout/Sidebar.tsx', '// ─── Sidebar ──', '// ─── Top Nav ──');
write('components/layout/TopNav.tsx', '// ─── Top Nav ──', '// ─── Command Palette ──');
write('components/layout/CommandPalette.tsx', '// ─── Command Palette ──', '// ─── Dashboard Page ──');

// 6. Pages
write('features/dashboard/DashboardPage.tsx', '// ─── Dashboard Page ──', '// ─── Clients Page ──');
write('features/clients/ClientsPage.tsx', '// ─── Clients Page ──', '// ─── Active Contracts Page ──');
write('features/contracts/ActiveContractsPage.tsx', '// ─── Active Contracts Page ──', '// ─── Tech Talent Page ──');
write('features/talent/TechTalentPage.tsx', '// ─── Tech Talent Page ──', '// ─── AI Insights Page ──');
write('features/ai-insights/AIInsightsPage.tsx', '// ─── AI Insights Page ──', '// ─── Generic Page ──');
write('features/common/GenericPage.tsx', '// ─── Generic Page ──', '// ─── App ──');

// 7. App Main
write('app/App.tsx', '// ─── App ──', '// ─── EOF ──'); // till end

console.log('Done splitting!');
