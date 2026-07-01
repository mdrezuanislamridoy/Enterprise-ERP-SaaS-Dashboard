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
exports.TalentController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const data_1 = require("../data");
let TalentController = class TalentController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTalent() {
        try {
            const employees = await this.prisma.employee.findMany();
            if (employees.length === 0)
                throw new Error("Empty DB");
            const formattedEmployees = employees.map(e => ({
                ...e,
                risk: e.burnoutRisk
            }));
            return { employees: formattedEmployees };
        }
        catch {
            return { employees: data_1.employees };
        }
    }
    async createTalent(body) {
        const count = await this.prisma.employee.count();
        const newId = `E-${1000 + count + 1}`;
        const employee = await this.prisma.employee.create({
            data: {
                id: newId,
                name: body.name,
                role: body.role,
                utilization: parseInt(body.utilization) || 0,
                performance: parseInt(body.performance) || 0,
                burnoutRisk: body.risk || "Low",
                dept: body.dept || "Engineering",
                email: body.email || `${body.name.split(' ')[0].toLowerCase()}@nexus.com`,
                salary: body.salary || "$120,000",
                status: body.status || "active",
                joined: body.joined || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            }
        });
        return {
            employee: {
                ...employee,
                risk: employee.burnoutRisk
            }
        };
    }
    async updateTalent(id, body) {
        const dataToUpdate = {};
        if (body.name !== undefined)
            dataToUpdate.name = body.name;
        if (body.role !== undefined)
            dataToUpdate.role = body.role;
        if (body.utilization !== undefined)
            dataToUpdate.utilization = parseInt(body.utilization);
        if (body.performance !== undefined)
            dataToUpdate.performance = parseInt(body.performance);
        if (body.risk !== undefined)
            dataToUpdate.burnoutRisk = body.risk;
        if (body.dept !== undefined)
            dataToUpdate.dept = body.dept;
        if (body.email !== undefined)
            dataToUpdate.email = body.email;
        if (body.salary !== undefined)
            dataToUpdate.salary = body.salary;
        if (body.status !== undefined)
            dataToUpdate.status = body.status;
        if (body.joined !== undefined)
            dataToUpdate.joined = body.joined;
        const employee = await this.prisma.employee.update({
            where: { id },
            data: dataToUpdate
        });
        return {
            employee: {
                ...employee,
                risk: employee.burnoutRisk
            }
        };
    }
    async deleteTalent(id) {
        await this.prisma.employee.delete({
            where: { id },
        });
        return { success: true };
    }
};
exports.TalentController = TalentController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TalentController.prototype, "getTalent", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TalentController.prototype, "createTalent", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TalentController.prototype, "updateTalent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TalentController.prototype, "deleteTalent", null);
exports.TalentController = TalentController = __decorate([
    (0, common_1.Controller)('api/talent'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TalentController);
//# sourceMappingURL=talent.controller.js.map