import React, { useState, useEffect, useCallback, Suspense, lazy } from "react";
const RemoteAnalyticsDashboard = lazy(() => import("remote_analytics/AnalyticsDashboard" as any));

import { Sidebar } from "../components/layout/Sidebar";
import { TopNav } from "../components/layout/TopNav";
import { CommandPalette } from "../components/layout/CommandPalette";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { ClientsPage } from "../features/clients/ClientsPage";
import { ActiveContractsPage } from "../features/contracts/ActiveContractsPage";
import { TechTalentPage } from "../features/talent/TechTalentPage";
import { AIInsightsPage } from "../features/ai-insights/AIInsightsPage";
import { SystemAlertsPage } from "../features/cloud-ops/SystemAlertsPage";
import { InfrastructurePage } from "../features/cloud-ops/InfrastructurePage";
import { ApiUsagePage } from "../features/cloud-ops/ApiUsagePage";
import { CloudCostsPage } from "../features/cloud-ops/CloudCostsPage";
import { ProposalsPage } from "../features/clients/ProposalsPage";
import { SlasPage } from "../features/clients/SlasPage";
import { SkillMatrixPage } from "../features/employee-mgmt/SkillMatrixPage";
import { PerformancePage } from "../features/employee-mgmt/PerformancePage";
import { AllocationPage } from "../features/employee-mgmt/AllocationPage";
import { InvoicesPage } from "../features/finance/InvoicesPage";
import { PayrollPage } from "../features/finance/PayrollPage";
import { LicensesPage } from "../features/finance/LicensesPage";
import { MrrPage } from "../features/finance/MrrPage";
import { DeliveryReportsPage } from "../features/reports/DeliveryReportsPage";
import { MarginAnalysisPage } from "../features/reports/MarginAnalysisPage";
import { GenericPage } from "../features/common/GenericPage";
import { LoginPage } from "../features/auth/LoginPage";
import { useAuth } from "../context/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState([
    "Client Services",
    "AI Employee Mgmt",
    "Cloud Ops",
    "Finance",
    "Reports",
  ]);

  const toggleGroup = useCallback((label: string) => {
    setExpandedGroups((prev) =>
      prev.includes(label) ? prev.filter((g) => g !== label) : [...prev, label],
    );
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (notifOpen) {
      const close = (e: MouseEvent) => {
        const target = e.target as Element;
        if (!target.closest("[data-notif]")) setNotifOpen(false);
      };
      document.addEventListener("click", close, { capture: true });
      return () =>
        document.removeEventListener("click", close, { capture: true });
    }
  }, [notifOpen]);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "clients":
        return <ClientsPage />;
      case "active-contracts":
        return <ActiveContractsPage />;
      case "proposals":
        return <ProposalsPage />;
      case "slas":
        return <SlasPage />;
      case "tech-talent":
        return <TechTalentPage />;
      case "skill-matrix":
        return <SkillMatrixPage />;
      case "performance":
        return <PerformancePage />;
      case "burnout-risk":
        return <TechTalentPage />;
      case "allocation":
        return <AllocationPage />;
      case "ai-insights":
        return <AIInsightsPage />;
      case "system-alerts":
        return <SystemAlertsPage />;
      case "infrastructure":
        return <InfrastructurePage />;
      case "api-usage":
        return <ApiUsagePage />;
      case "cloud-costs":
        return <CloudCostsPage />;
      case "mrr":
        return <MrrPage />;
      case "invoices":
        return <InvoicesPage />;
      case "payroll":
        return <PayrollPage />;
      case "software-licenses":
        return <LicensesPage />;
      case "delivery-reports":
        return <DeliveryReportsPage />;
      case "margin-analysis":
        return <MarginAnalysisPage />;
      case "analytics":
        return (
          <Suspense
            fallback={
              <div className="p-10 text-center text-muted-foreground flex flex-col items-center justify-center min-h-[60vh]">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                Loading Remote Analytics Module...
              </div>
            }
          >
            <RemoteAnalyticsDashboard />
          </Suspense>
        );
      default:
        return <GenericPage pageId={activePage} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        className={darkMode ? "dark" : ""}
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        <LoginPage />
      </div>
    );
  }

  return (
    <div
      className={darkMode ? "dark" : ""}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
        <Sidebar
          collapsed={sidebarCollapsed}
          activePage={activePage}
          setActivePage={setActivePage}
          expandedGroups={expandedGroups}
          toggleGroup={toggleGroup}
        />

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div data-notif>
            <TopNav
              onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
              darkMode={darkMode}
              onToggleDark={() => setDarkMode((d) => !d)}
              onOpenCmd={() => setCmdOpen(true)}
              activePage={activePage}
              notifOpen={notifOpen}
              setNotifOpen={setNotifOpen}
            />
          </div>

          <main className="flex-1 overflow-y-auto scrollbar-hide">
            {renderPage()}
          </main>
        </div>

        <CommandPalette
          open={cmdOpen}
          onClose={() => setCmdOpen(false)}
          setActivePage={(p) => {
            setActivePage(p);
            setCmdOpen(false);
          }}
        />
      </div>

      <style>{`
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        * { transition-property: color, background-color, border-color; transition-duration: 150ms; }
      `}</style>
    </div>
  );
}
