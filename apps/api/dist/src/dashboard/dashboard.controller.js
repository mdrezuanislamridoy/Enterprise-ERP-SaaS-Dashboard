"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const data_1 = require("../data");
let DashboardController = class DashboardController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard() {
        try {
            const [mrrData, revenueByCategoryData, clientGrowthData, kpis, activeContracts, topServices, systemAlerts, activities, totalActiveContracts, totalActiveClients, totalTalent, allClientsForMrr] = await Promise.all([
                this.prisma.revenueMetric.findMany(),
                this.prisma.revenueByCategory.findMany(),
                this.prisma.clientGrowth.findMany(),
                this.prisma.kpi.findMany(),
                this.prisma.contract.findMany({ take: 5, include: { client: true } }),
                this.prisma.topService.findMany(),
                this.prisma.systemAlert.findMany(),
                this.prisma.activity.findMany({ take: 6 }),
                this.prisma.contract.count({ where: { status: 'Active' } }),
                this.prisma.client.count({ where: { status: 'Active' } }),
                this.prisma.employee.count(),
                this.prisma.client.findMany({ select: { mrr: true } })
            ]);
            if (kpis.length === 0)
                throw new Error("Empty DB");
            let totalMrr = 0;
            for (const client of allClientsForMrr) {
                const numericMrr = parseInt(client.mrr.replace(/[^0-9]/g, ''));
                if (!isNaN(numericMrr))
                    totalMrr += numericMrr;
            }
            const dynamicKpis = kpis.map(kpi => {
                if (kpi.label === 'Contracts') {
                    return { ...kpi, value: totalActiveContracts.toString() };
                }
                if (kpi.label === 'Active Clients') {
                    return { ...kpi, value: totalActiveClients.toString() };
                }
                if (kpi.label === 'Tech Talent') {
                    return { ...kpi, value: totalTalent.toString() };
                }
                if (kpi.label === 'MRR') {
                    const mFormatted = totalMrr >= 1000000
                        ? `$${(totalMrr / 1000000).toFixed(1)}M`
                        : `$${(totalMrr / 1000).toFixed(0)}K`;
                    return { ...kpi, value: mFormatted };
                }
                return kpi;
            });
            const formattedContracts = activeContracts.map(c => ({
                ...c,
                id: c.contractId,
                client: c.client?.name || c.clientId
            }));
            const formattedAlerts = systemAlerts.map(a => ({
                ...a,
                id: a.alertId
            }));
            return {
                mrrData,
                revenueByCategoryData,
                clientGrowthData,
                kpis: dynamicKpis,
                activeContracts: formattedContracts,
                topServices,
                systemAlerts: formattedAlerts,
                activities
            };
        }
        catch (error) {
            return {
                mrrData: data_1.mrrData,
                revenueByCategoryData: data_1.revenueByCategoryData,
                clientGrowthData: data_1.clientGrowthData,
                kpis: data_1.kpis,
                activeContracts: data_1.activeContracts.slice(0, 5),
                topServices: data_1.topServices,
                systemAlerts: data_1.systemAlerts,
                activities: data_1.activities.slice(0, 6),
            };
        }
    }
    async search() {
        return {
            results: [
                { id: '1', title: 'BlueSky Systems', type: 'Client' },
                { id: '2', title: 'Q3 Enterprise Architecture', type: 'Contract' },
                { id: '3', title: 'Sarah Chen', type: 'Talent' }
            ]
        };
    }
    async getNotifications() {
        try {
            const notifs = await this.prisma.notification.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5
            });
            return { notifications: notifs };
        }
        catch {
            return { notifications: [] };
        }
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getNotifications", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('api/dashboard'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map