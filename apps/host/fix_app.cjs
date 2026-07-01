const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

const newImports = `import { Sidebar } from "../components/layout/Sidebar";
import { TopNav } from "../components/layout/TopNav";
import { CommandPalette } from "../components/layout/CommandPalette";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { ClientsPage } from "../features/clients/ClientsPage";
import { ActiveContractsPage } from "../features/contracts/ActiveContractsPage";
import { TechTalentPage } from "../features/talent/TechTalentPage";
import { AIInsightsPage } from "../features/ai-insights/AIInsightsPage";
import { GenericPage } from "../features/common/GenericPage";
`;

content = content.replace('// ─── App ───────────────────────────────────────────────────────────────────────', newImports);
fs.writeFileSync('src/app/App.tsx', content, 'utf8');
