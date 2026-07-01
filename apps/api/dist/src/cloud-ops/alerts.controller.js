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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AlertsController = class AlertsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAlerts() {
        const alerts = await this.prisma.systemAlert.findMany();
        return { alerts };
    }
    async createAlert(body) {
        const alert = await this.prisma.systemAlert.create({
            data: {
                alertId: `ALT-${Date.now()}`,
                service: body.service,
                metric: body.metric,
                threshold: body.threshold,
                status: body.status || "Warning",
            }
        });
        return { alert };
    }
    async updateAlert(id, body) {
        const alert = await this.prisma.systemAlert.update({
            where: { id },
            data: {
                service: body.service,
                metric: body.metric,
                threshold: body.threshold,
                status: body.status,
            }
        });
        return { alert };
    }
    async deleteAlert(id) {
        await this.prisma.systemAlert.delete({ where: { id } });
        return { success: true };
    }
};
exports.AlertsController = AlertsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "getAlerts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "createAlert", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "updateAlert", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlertsController.prototype, "deleteAlert", null);
exports.AlertsController = AlertsController = __decorate([
    (0, common_1.Controller)('api/alerts'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlertsController);
//# sourceMappingURL=alerts.controller.js.map