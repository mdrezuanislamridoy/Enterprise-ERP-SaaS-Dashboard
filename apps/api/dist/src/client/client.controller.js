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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const data_1 = require("../data");
let ClientController = class ClientController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getClients() {
        try {
            const clients = await this.prisma.client.findMany();
            if (clients.length === 0)
                throw new Error("Empty DB");
            return { clients };
        }
        catch {
            return { clients: data_1.clients };
        }
    }
    async createClient(body) {
        const count = await this.prisma.client.count();
        const newId = `C-${1000 + count + 1}`;
        const client = await this.prisma.client.create({
            data: {
                clientId: newId,
                name: body.name,
                email: body.email,
                plan: body.plan,
                mrr: body.mrr,
                status: body.status || "Active",
                joined: body.joined || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                stack: body.stack || "React, Node.js",
            },
        });
        return { client };
    }
    async updateClient(id, body) {
        const client = await this.prisma.client.update({
            where: { clientId: id },
            data: {
                name: body.name,
                email: body.email,
                plan: body.plan,
                mrr: body.mrr,
                status: body.status,
                joined: body.joined,
                stack: body.stack,
            },
        });
        return { client };
    }
    async deleteClient(id) {
        await this.prisma.client.delete({
            where: { clientId: id },
        });
        return { success: true };
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClients", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateClient", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "deleteClient", null);
exports.ClientController = ClientController = __decorate([
    (0, common_1.Controller)('api/clients'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientController);
//# sourceMappingURL=client.controller.js.map