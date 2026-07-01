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
exports.MrrController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MrrController = class MrrController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMrr() {
        const clients = await this.prisma.client.findMany();
        const totalMrr = clients.reduce((sum, c) => {
            const num = parseFloat(c.mrr.replace(/[^0-9.]/g, ''));
            return sum + (isNaN(num) ? 0 : num);
        }, 0);
        const revenueMetrics = await this.prisma.revenueMetric.findMany();
        return {
            totalMrr: `$${totalMrr.toLocaleString()}`,
            activeClients: clients.filter(c => c.status === 'Active').length,
            totalClients: clients.length,
            revenueMetrics,
        };
    }
};
exports.MrrController = MrrController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MrrController.prototype, "getMrr", null);
exports.MrrController = MrrController = __decorate([
    (0, common_1.Controller)('api/mrr'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MrrController);
//# sourceMappingURL=mrr.controller.js.map