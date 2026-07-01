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
exports.MarginAnalysisController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let MarginAnalysisController = class MarginAnalysisController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() { return { items: await this.prisma.marginAnalysis.findMany() }; }
    async create(body) {
        const revenue = parseFloat(body.revenue) || 0;
        const cost = parseFloat(body.cost) || 0;
        const margin = revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0;
        const item = await this.prisma.marginAnalysis.create({ data: { project: body.project, revenue, cost, margin: parseFloat(margin.toFixed(1)), status: body.status || 'Active' } });
        return { item };
    }
    async update(id, body) {
        const revenue = body.revenue !== undefined ? parseFloat(body.revenue) : undefined;
        const cost = body.cost !== undefined ? parseFloat(body.cost) : undefined;
        const data = { project: body.project, status: body.status };
        if (revenue !== undefined)
            data.revenue = revenue;
        if (cost !== undefined)
            data.cost = cost;
        if (revenue !== undefined && cost !== undefined)
            data.margin = parseFloat((((revenue - cost) / revenue) * 100).toFixed(1));
        const item = await this.prisma.marginAnalysis.update({ where: { id }, data });
        return { item };
    }
    async delete(id) { await this.prisma.marginAnalysis.delete({ where: { id } }); return { success: true }; }
};
exports.MarginAnalysisController = MarginAnalysisController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarginAnalysisController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarginAnalysisController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarginAnalysisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarginAnalysisController.prototype, "delete", null);
exports.MarginAnalysisController = MarginAnalysisController = __decorate([
    (0, common_1.Controller)('api/margin-analysis'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarginAnalysisController);
//# sourceMappingURL=margin-analysis.controller.js.map