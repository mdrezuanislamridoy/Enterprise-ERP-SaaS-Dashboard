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
exports.ApiMetricsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ApiMetricsController = class ApiMetricsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMetrics() {
        const metrics = await this.prisma.apiMetric.findMany();
        return { metrics };
    }
    async createMetric(body) {
        const metric = await this.prisma.apiMetric.create({
            data: {
                endpoint: body.endpoint,
                requests: parseInt(body.requests) || 0,
                latency: parseInt(body.latency) || 0,
                errorRate: parseFloat(body.errorRate) || 0.0,
                status: body.status || "Normal",
            }
        });
        return { metric };
    }
    async updateMetric(id, body) {
        const metric = await this.prisma.apiMetric.update({
            where: { id },
            data: {
                endpoint: body.endpoint,
                requests: body.requests !== undefined ? parseInt(body.requests) : undefined,
                latency: body.latency !== undefined ? parseInt(body.latency) : undefined,
                errorRate: body.errorRate !== undefined ? parseFloat(body.errorRate) : undefined,
                status: body.status,
            }
        });
        return { metric };
    }
    async deleteMetric(id) {
        await this.prisma.apiMetric.delete({ where: { id } });
        return { success: true };
    }
};
exports.ApiMetricsController = ApiMetricsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiMetricsController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiMetricsController.prototype, "createMetric", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApiMetricsController.prototype, "updateMetric", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiMetricsController.prototype, "deleteMetric", null);
exports.ApiMetricsController = ApiMetricsController = __decorate([
    (0, common_1.Controller)('api/api-metrics'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApiMetricsController);
//# sourceMappingURL=api-metrics.controller.js.map