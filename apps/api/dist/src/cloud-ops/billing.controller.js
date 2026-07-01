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
exports.BillingController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BillingController = class BillingController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBilling() {
        const billing = await this.prisma.billing.findMany();
        return { billing };
    }
    async createBilling(body) {
        const billing = await this.prisma.billing.create({
            data: {
                service: body.service,
                cost: parseFloat(body.cost) || 0.0,
                trend: parseFloat(body.trend) || 0.0,
                status: body.status || "Stable",
                lastUpdated: body.lastUpdated || new Date().toISOString().split('T')[0],
            }
        });
        return { billing };
    }
    async updateBilling(id, body) {
        const billing = await this.prisma.billing.update({
            where: { id },
            data: {
                service: body.service,
                cost: body.cost !== undefined ? parseFloat(body.cost) : undefined,
                trend: body.trend !== undefined ? parseFloat(body.trend) : undefined,
                status: body.status,
                lastUpdated: body.lastUpdated,
            }
        });
        return { billing };
    }
    async deleteBilling(id) {
        await this.prisma.billing.delete({ where: { id } });
        return { success: true };
    }
};
exports.BillingController = BillingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getBilling", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "createBilling", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "updateBilling", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "deleteBilling", null);
exports.BillingController = BillingController = __decorate([
    (0, common_1.Controller)('api/billing'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingController);
//# sourceMappingURL=billing.controller.js.map