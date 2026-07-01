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
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PayrollController = class PayrollController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() { return { items: await this.prisma.payroll.findMany() }; }
    async create(body) {
        const item = await this.prisma.payroll.create({ data: { employee: body.employee, period: body.period, salary: body.salary, deductions: body.deductions || '$0', netPay: body.netPay, status: body.status || 'Pending' } });
        return { item };
    }
    async update(id, body) {
        const item = await this.prisma.payroll.update({ where: { id }, data: { employee: body.employee, period: body.period, salary: body.salary, deductions: body.deductions, netPay: body.netPay, status: body.status } });
        return { item };
    }
    async delete(id) { await this.prisma.payroll.delete({ where: { id } }); return { success: true }; }
};
exports.PayrollController = PayrollController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "delete", null);
exports.PayrollController = PayrollController = __decorate([
    (0, common_1.Controller)('api/payroll'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayrollController);
//# sourceMappingURL=payroll.controller.js.map