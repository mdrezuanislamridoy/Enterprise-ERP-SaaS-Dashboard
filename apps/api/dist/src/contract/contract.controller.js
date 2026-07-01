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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const data_1 = require("../data");
let ContractController = class ContractController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getContracts() {
        try {
            const contracts = await this.prisma.contract.findMany({
                include: { client: true }
            });
            if (contracts.length === 0)
                throw new Error("Empty DB");
            const formattedContracts = contracts.map(c => ({
                ...c,
                id: c.contractId,
                client: c.client?.name || c.clientId
            }));
            return { activeContracts: formattedContracts };
        }
        catch {
            return { activeContracts: data_1.activeContracts };
        }
    }
    async createContract(body) {
        const count = await this.prisma.contract.count();
        const newId = `CNTR-${1000 + count + 1}`;
        let clientId = body.clientId || 'C-1001';
        if (body.clientName) {
            const client = await this.prisma.client.findFirst({ where: { name: body.clientName } });
            if (client)
                clientId = client.clientId;
        }
        const contract = await this.prisma.contract.create({
            data: {
                contractId: newId,
                clientId: clientId,
                service: body.service,
                value: body.value,
                status: body.status || "Active",
                deadline: body.deadline || "TBD",
            },
            include: { client: true }
        });
        return {
            contract: {
                ...contract,
                id: contract.contractId,
                client: contract.client?.name || contract.clientId
            }
        };
    }
    async updateContract(id, body) {
        let clientId = body.clientId;
        if (body.clientName) {
            const client = await this.prisma.client.findFirst({ where: { name: body.clientName } });
            if (client)
                clientId = client.clientId;
        }
        const contract = await this.prisma.contract.update({
            where: { contractId: id },
            data: {
                ...(clientId && { clientId }),
                service: body.service,
                value: body.value,
                status: body.status,
                deadline: body.deadline,
            },
            include: { client: true }
        });
        return {
            contract: {
                ...contract,
                id: contract.contractId,
                client: contract.client?.name || contract.clientId
            }
        };
    }
    async deleteContract(id) {
        await this.prisma.contract.delete({
            where: { contractId: id },
        });
        return { success: true };
    }
};
exports.ContractController = ContractController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "getContracts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "createContract", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "updateContract", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "deleteContract", null);
exports.ContractController = ContractController = __decorate([
    (0, common_1.Controller)('api/contracts'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContractController);
//# sourceMappingURL=contract.controller.js.map